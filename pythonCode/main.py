import serial
import time
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from mpl_toolkits.mplot3d import Axes3D
import re
import math
import threading

# Configuration
SERIAL_PORT = '/dev/cu.usbmodem101'  # Change this to match your Arduino port
BAUD_RATE = 115200

# Initialize serial connection
def initialize_serial():
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        print(f"Connected to {SERIAL_PORT} at {BAUD_RATE} baud")
        time.sleep(2)  # Allow time for connection to establish
        return ser
    except Exception as e:
        print(f"Error opening serial port: {e}")
        return None

# Parse data from serial
def parse_serial_data(line):
    data = {'wrist': {}, 'elbow': {}}
    
    try:
        if "MPU1 Accel:" in line:
            values = re.findall(r'-?\d+\.\d+|-?\d+', line)
            if len(values) >= 3:
                data['wrist']['ax'] = float(values[0])
                data['wrist']['ay'] = float(values[1])
                data['wrist']['az'] = float(values[2])
        elif "MPU1 Gyro:" in line:
            values = re.findall(r'-?\d+\.\d+|-?\d+', line)
            if len(values) >= 3:
                data['wrist']['gx'] = float(values[0])
                data['wrist']['gy'] = float(values[1])
                data['wrist']['gz'] = float(values[2])
        elif "MPU2 Accel:" in line:
            values = re.findall(r'-?\d+\.\d+|-?\d+', line)
            if len(values) >= 3:
                data['elbow']['ax'] = float(values[0])
                data['elbow']['ay'] = float(values[1])
                data['elbow']['az'] = float(values[2])
        elif "MPU2 Gyro:" in line:
            values = re.findall(r'-?\d+\.\d+|-?\d+', line)
            if len(values) >= 3:
                data['elbow']['gx'] = float(values[0])
                data['elbow']['gy'] = float(values[1])
                data['elbow']['gz'] = float(values[2])
    except Exception as e:
        print(f"Error parsing data: {e}")
    
    return data

# Convert accelerometer data to tilt angles with improved accuracy
def accel_to_angles(ax, ay, az):
    """Convert raw accelerometer data to roll and pitch angles (degrees) with improved accuracy"""
    # Use more robust angle calculation with atan2
    roll = math.atan2(ay, math.sqrt(ax**2 + az**2)) * 180 / math.pi
    pitch = math.atan2(-ax, math.sqrt(ay**2 + az**2)) * 180 / math.pi
    return roll, pitch

# Class to store and manage sensor data
class ArmModel:
    def __init__(self):
        # Default positions (fixed base at shoulder)
        self.shoulder = np.array([0, 0, 0])
        self.elbow = np.array([1, 0, 0])
        self.wrist = np.array([2, 0, 0])
        
        # Segment lengths and dimensions
        self.upper_arm_length = 1.0
        self.forearm_length = 1.0
        self.upper_arm_radius = 0.15
        self.forearm_radius = 0.12
        self.hand_radius = 0.1
        self.shoulder_radius = 0.2
        
        # Orientation angles (degrees)
        self.elbow_roll = 0
        self.elbow_pitch = 0
        self.wrist_roll = 0
        self.wrist_pitch = 0
        
        # Previous angles for complementary filter
        self.prev_wrist_angles = [0, 0]  # [roll, pitch]
        self.prev_elbow_angles = [0, 0]  # [roll, pitch]
        self.comp_filter_alpha = 0.8  # Complementary filter parameter
        
        # Data history for plotting
        self.history_length = 20
        self.wrist_history = []
        self.elbow_history = []
        
        # Debug values
        self.raw_elbow_accel = {'ax': 0, 'ay': 0, 'az': 0}
        self.raw_wrist_accel = {'ax': 0, 'ay': 0, 'az': 0}
        
        # Calibration values (offsets)
        self.calibration_elbow = {'ax': 0, 'ay': 0, 'az': 0}
        self.calibration_wrist = {'ax': 0, 'ay': 0, 'az': 0}
        self.is_calibrated = False
        
        # Filtering parameters - reduced for stronger filtering
        self.filter_alpha = 0.1  # Larger = less filtering (0-1)
        self.filtered_elbow_accel = {'ax': 0, 'ay': 0, 'az': 0}
        self.filtered_wrist_accel = {'ax': 0, 'ay': 0, 'az': 0}
        
        # Calibration state
        self.is_calibrating = False
        self.calibration_start_time = 0
        self.calibration_samples_wrist = {'ax': [], 'ay': [], 'az': []}
        self.calibration_samples_elbow = {'ax': [], 'ay': [], 'az': []}
        self.calibration_message = ""
        self.calibration_duration = 3.0  # Increased to 3 seconds for better calibration
    
    def start_calibration(self):
        """Start the calibration process"""
        # Only start if not already calibrating
        if not self.is_calibrating:
            print("Starting calibration process...")
            self.is_calibrating = True
            self.calibration_start_time = time.time()
            
            # Reset sample collections
            self.calibration_samples_wrist = {'ax': [], 'ay': [], 'az': []}
            self.calibration_samples_elbow = {'ax': [], 'ay': [], 'az': []}
            self.calibration_message = "CALIBRATING - Hold arm straight and steady..."
            
            # Reset arm position to straight 
            self.elbow = np.array([1, 0, 0])
            self.wrist = np.array([2, 0, 0])
            
            # Force a redraw to show straight arm
            self._update_positions()
    
    def collect_calibration_sample(self):
        """Collect a sample during calibration period"""
        if self.is_calibrating:
            # Add current filtered values to samples
            for axis in ['ax', 'ay', 'az']:
                if axis in self.filtered_wrist_accel:
                    self.calibration_samples_wrist[axis].append(self.raw_wrist_accel[axis])
                if axis in self.filtered_elbow_accel:
                    self.calibration_samples_elbow[axis].append(self.raw_elbow_accel[axis])
            
            # Check if calibration time is complete
            elapsed_time = time.time() - self.calibration_start_time
            if elapsed_time >= self.calibration_duration:
                self.finish_calibration()
                return True
            else:
                remaining = self.calibration_duration - elapsed_time
                self.calibration_message = f"CALIBRATING - Hold arm straight and steady... {remaining:.1f}s remaining"
                return False
    
    def finish_calibration(self):
        """Complete calibration with improved outlier rejection"""
        if not self.is_calibrating:
            return
            
        print("Finalizing calibration with collected samples...")
            
        # Calculate average for each axis with better outlier rejection
        for axis in ['ax', 'ay', 'az']:
            # Wrist calibration
            if self.calibration_samples_wrist[axis]:
                # Remove outliers - use 1.5 standard deviations for tighter bounds
                samples = np.array(self.calibration_samples_wrist[axis])
                mean = np.mean(samples)
                std = np.std(samples)
                good_samples = samples[abs(samples - mean) <= 1.5 * std]
                
                if len(good_samples) > 0:
                    self.calibration_wrist[axis] = np.mean(good_samples)
                    # For Z axis, adjust to account for gravity properly
                    if axis == 'az':
                        gravity_factor = 1.0  # Adjust based on your sensor's scale
                        if abs(self.calibration_wrist[axis]) < 0.5:  # If close to 0
                            self.calibration_wrist[axis] = 0
                        elif self.calibration_wrist[axis] > 0:
                            self.calibration_wrist[axis] -= gravity_factor
                        else:
                            self.calibration_wrist[axis] += gravity_factor
            
            # Elbow calibration - same improvements
            if self.calibration_samples_elbow[axis]:
                samples = np.array(self.calibration_samples_elbow[axis])
                mean = np.mean(samples)
                std = np.std(samples)
                good_samples = samples[abs(samples - mean) <= 1.5 * std]
                
                if len(good_samples) > 0:
                    self.calibration_elbow[axis] = np.mean(good_samples)
                    if axis == 'az':
                        gravity_factor = 1.0
                        if abs(self.calibration_elbow[axis]) < 0.5:
                            self.calibration_elbow[axis] = 0
                        elif self.calibration_elbow[axis] > 0:
                            self.calibration_elbow[axis] -= gravity_factor
                        else:
                            self.calibration_elbow[axis] += gravity_factor
        
        # Reset arm position to straight
        self.elbow_roll = 0
        self.elbow_pitch = 0
        self.wrist_roll = 0
        self.wrist_pitch = 0
        self._update_positions()
        
        # End calibration
        self.is_calibrating = False
        self.is_calibrated = True
        self.calibration_message = "CALIBRATION COMPLETE!"
        
        print("Calibration completed!")
        print(f"Wrist calibration: {self.calibration_wrist}")
        print(f"Elbow calibration: {self.calibration_elbow}")
        
        # Start a timer to clear the message after 3 seconds
        def clear_message():
            time.sleep(3)
            self.calibration_message = ""
        
        threading.Thread(target=clear_message, daemon=True).start()
    
    def _apply_low_pass_filter(self, prev_value, new_value, alpha):
        """Apply a simple low-pass filter to reduce noise"""
        return alpha * new_value + (1 - alpha) * prev_value
    
    def update_from_sensors(self, wrist_data, elbow_data):
        """Update arm model from sensor data"""
        # If calibrating, collect samples and don't update position
        if self.is_calibrating:
            # During calibration, just update the raw data but keep position fixed
            if wrist_data:
                for axis in ['ax', 'ay', 'az']:
                    if axis in wrist_data:
                        self.raw_wrist_accel[axis] = wrist_data[axis]
            
            if elbow_data:
                for axis in ['ax', 'ay', 'az']:
                    if axis in elbow_data:
                        self.raw_elbow_accel[axis] = elbow_data[axis]
            
            self.collect_calibration_sample()
            return
        
        # Normal operation - update positions based on sensor data
        # Update wrist sensor data
        if wrist_data and 'ax' in wrist_data and 'ay' in wrist_data and 'az' in wrist_data:
            # Store raw values for debugging
            self.raw_wrist_accel = {
                'ax': wrist_data['ax'],
                'ay': wrist_data['ay'],
                'az': wrist_data['az']
            }
            
            # Apply low pass filter
            for axis in ['ax', 'ay', 'az']:
                if axis in self.raw_wrist_accel:
                    self.filtered_wrist_accel[axis] = self._apply_low_pass_filter(
                        self.filtered_wrist_accel.get(axis, self.raw_wrist_accel[axis]),
                        self.raw_wrist_accel[axis],
                        self.filter_alpha
                    )
            
            # Apply calibration if enabled
            if self.is_calibrated:
                calibrated_ax = self.filtered_wrist_accel['ax'] - self.calibration_wrist['ax']
                calibrated_ay = self.filtered_wrist_accel['ay'] - self.calibration_wrist['ay']
                calibrated_az = self.filtered_wrist_accel['az'] - self.calibration_wrist['az']
            else:
                calibrated_ax = self.filtered_wrist_accel['ax']
                calibrated_ay = self.filtered_wrist_accel['ay'] 
                calibrated_az = self.filtered_wrist_accel['az']
            
            # Calculate orientation angles
            wrist_roll, wrist_pitch = accel_to_angles(
                calibrated_ax, calibrated_ay, calibrated_az)
            
            # Apply complementary filter to wrist angles
            self.wrist_roll = self.comp_filter_alpha * wrist_roll + (1-self.comp_filter_alpha) * self.prev_wrist_angles[0]
            self.wrist_pitch = self.comp_filter_alpha * wrist_pitch + (1-self.comp_filter_alpha) * self.prev_wrist_angles[1]
            self.prev_wrist_angles = [self.wrist_roll, self.wrist_pitch]
        
        # Update elbow sensor data
        if elbow_data and 'ax' in elbow_data and 'ay' in elbow_data and 'az' in elbow_data:
            # Store raw values for debugging
            self.raw_elbow_accel = {
                'ax': elbow_data['ax'],
                'ay': elbow_data['ay'],
                'az': elbow_data['az']
            }
            
            # Apply low pass filter
            for axis in ['ax', 'ay', 'az']:
                if axis in self.raw_elbow_accel:
                    self.filtered_elbow_accel[axis] = self._apply_low_pass_filter(
                        self.filtered_elbow_accel.get(axis, self.raw_elbow_accel[axis]),
                        self.raw_elbow_accel[axis],
                        self.filter_alpha
                    )
            
            # Apply calibration if enabled
            if self.is_calibrated:
                calibrated_ax = self.filtered_elbow_accel['ax'] - self.calibration_elbow['ax']
                calibrated_ay = self.filtered_elbow_accel['ay'] - self.calibration_elbow['ay']
                calibrated_az = self.filtered_elbow_accel['az'] - self.calibration_elbow['az']
            else:
                calibrated_ax = self.filtered_elbow_accel['ax']
                calibrated_ay = self.filtered_elbow_accel['ay']
                calibrated_az = self.filtered_elbow_accel['az']
            
            # Calculate orientation angles
            elbow_roll, elbow_pitch = accel_to_angles(
                calibrated_ax, calibrated_ay, calibrated_az)
            
            # Apply complementary filter to elbow angles
            self.elbow_roll = self.comp_filter_alpha * elbow_roll + (1-self.comp_filter_alpha) * self.prev_elbow_angles[0]
            self.elbow_pitch = self.comp_filter_alpha * elbow_pitch + (1-self.comp_filter_alpha) * self.prev_elbow_angles[1]
            self.prev_elbow_angles = [self.elbow_roll, self.elbow_pitch]
        
        # Update positions based on orientation
        self._update_positions()
    
    def _update_positions(self):
        """Calculate joint positions based on orientation angles with improved transformations"""
        # Convert angles to radians
        elbow_roll_rad = math.radians(self.elbow_roll)
        elbow_pitch_rad = math.radians(self.elbow_pitch)
        wrist_roll_rad = math.radians(self.wrist_roll)
        wrist_pitch_rad = math.radians(self.wrist_pitch)
        
        # Use rotation matrices for more accurate transformations
        # For elbow: First rotate around X (pitch), then around Z (roll)
        c_ep = math.cos(elbow_pitch_rad)
        s_ep = math.sin(elbow_pitch_rad)
        c_er = math.cos(elbow_roll_rad)
        s_er = math.sin(elbow_roll_rad)
        
        # Combined rotation matrix for elbow
        elbow_rotation = np.array([
            [c_er * c_ep, -s_er, c_er * s_ep],
            [s_er * c_ep, c_er, s_er * s_ep],
            [-s_ep, 0, c_ep]
        ])
        elbow_offset = elbow_rotation @ np.array([self.upper_arm_length, 0, 0])
        
        self.elbow = self.shoulder + elbow_offset
        
        # For wrist: First apply elbow orientation, then wrist orientation relative to elbow
        c_wp = math.cos(wrist_pitch_rad)
        s_wp = math.sin(wrist_pitch_rad)
        c_wr = math.cos(wrist_roll_rad)
        s_wr = math.sin(wrist_roll_rad)
        
        # Combined rotation matrix for wrist relative to elbow
        wrist_rotation = np.array([
            [c_wr * c_wp, -s_wr, c_wr * s_wp],
            [s_wr * c_wp, c_wr, s_wr * s_wp],
            [-s_wp, 0, c_wp]
        ])
        wrist_offset = wrist_rotation @ np.array([self.forearm_length, 0, 0])
        
        self.wrist = self.elbow + wrist_offset
        
        # Add to history
        self.wrist_history.append(np.copy(self.wrist))
        self.elbow_history.append(np.copy(self.elbow))
        
        # Limit history length
        if len(self.wrist_history) > self.history_length:
            self.wrist_history.pop(0)
            self.elbow_history.pop(0)
    
    def get_arm_points(self):
        """Get the points representing the arm for plotting"""
        return [self.shoulder, self.elbow, self.wrist]

# Create 3D cylindrical segment for arm parts
def create_cylinder_arm_segment(p1, p2, radius, resolution=10, color='blue', alpha=0.7):
    """Create a 3D cylinder between two points"""
    # Vector in direction of axis
    v = p2 - p1
    mag = np.linalg.norm(v)
    if mag == 0:
        return None, None, None, None, None  # Return None if points are the same
        
    # Normalize v
    v = v / mag
    
    # Perpendicular vectors to create the circle
    not_v = np.array([1, 0, 0])
    if (v == not_v).all():
        not_v = np.array([0, 1, 0])
        
    # First perpendicular vector
    n1 = np.cross(v, not_v)
    n1 = n1 / np.linalg.norm(n1)
    
    # Second perpendicular vector
    n2 = np.cross(v, n1)
    
    # Create points around the circle at each end
    theta = np.linspace(0, 2*np.pi, resolution)
    x = np.zeros((resolution, 2))
    y = np.zeros((resolution, 2))
    z = np.zeros((resolution, 2))
    
    # Generate circle points at each end
    for i in range(resolution):
        # Circular points
        circle_point = p1 + radius*(n1*np.cos(theta[i]) + n2*np.sin(theta[i]))
        x[i, 0] = circle_point[0]
        y[i, 0] = circle_point[1]
        z[i, 0] = circle_point[2]
        
        circle_point = p2 + radius*(n1*np.cos(theta[i]) + n2*np.sin(theta[i]))
        x[i, 1] = circle_point[0]
        y[i, 1] = circle_point[1]
        z[i, 1] = circle_point[2]
    
    return x, y, z, color, alpha

# Create sphere for joints
def create_sphere(center, radius, resolution=10, color='blue', alpha=0.7):
    """Create a 3D sphere at a point"""
    u = np.linspace(0, 2 * np.pi, resolution)
    v = np.linspace(0, np.pi, resolution)
    
    x = center[0] + radius * np.outer(np.cos(u), np.sin(v))
    y = center[1] + radius * np.outer(np.sin(u), np.sin(v))
    z = center[2] + radius * np.outer(np.ones(np.size(u)), np.cos(v))
    
    return x, y, z, color, alpha

# Set up the 3D figure
def setup_3d_plot():
    fig = plt.figure(figsize=(12, 9))
    ax = fig.add_subplot(111, projection='3d')
    ax.set_title('3D Arm Movement Visualization')
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_xlim(-2, 3)
    ax.set_ylim(-2, 2)
    ax.set_zlim(-2, 2)
    return fig, ax

# Key press event handler for calibration
def on_key_press(event, arm_model):
    if event.key == 'c':
        print("Calibration key pressed")
        arm_model.start_calibration()

# Update function for animation
def update(frame, ser, ax, arm_model):
    # Read serial data
    data_wrist = {}
    data_elbow = {}
    
    if ser and ser.is_open:
        try:
            # Read available lines
            for _ in range(10):  # Read up to 10 lines at a time
                if ser.in_waiting > 0:
                    line = ser.readline().decode('utf-8', errors='replace').strip()
                    data = parse_serial_data(line)
                    
                    # Update with any new data
                    if data['wrist']:
                        data_wrist.update(data['wrist'])
                    if data['elbow']:
                        data_elbow.update(data['elbow'])
                else:
                    break
        except Exception as e:
            print(f"Error reading serial: {e}")
    
    # Update arm model if we have data
    if data_wrist or data_elbow:
        arm_model.update_from_sensors(data_wrist, data_elbow)
    
    # Clear the axis for redrawing
    ax.clear()
    
    # Set titles and limits
    if arm_model.is_calibrating:
        status_text = f" (CALIBRATING - Hold arm straight for {arm_model.calibration_duration} seconds)"
    elif arm_model.is_calibrated:
        status_text = " (Calibrated - Press C to recalibrate)"
    else:
        status_text = " (Not Calibrated - Press C to set current position as zero)"
    
    ax.set_title('3D Arm Movement Visualization' + status_text)
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_xlim(-2, 3)
    ax.set_ylim(-2, 2)
    ax.set_zlim(-2, 2)
    
    # Get arm points
    points = arm_model.get_arm_points()
    
    # Create 3D arm parts
    # Shoulder joint (sphere)
    shoulder_sphere = create_sphere(points[0], arm_model.shoulder_radius, color='darkblue', alpha=0.8)
    ax.plot_surface(shoulder_sphere[0], shoulder_sphere[1], shoulder_sphere[2], color=shoulder_sphere[3], alpha=shoulder_sphere[4])
    
    # Upper arm (cylinder)
    upper_arm = create_cylinder_arm_segment(points[0], points[1], arm_model.upper_arm_radius, color='royalblue')
    if upper_arm[0] is not None:
        ax.plot_surface(upper_arm[0], upper_arm[1], upper_arm[2], color=upper_arm[3], alpha=upper_arm[4])
    
    # Elbow joint (sphere)
    elbow_sphere = create_sphere(points[1], arm_model.upper_arm_radius * 1.1, color='mediumblue', alpha=0.8)
    ax.plot_surface(elbow_sphere[0], elbow_sphere[1], elbow_sphere[2], color=elbow_sphere[3], alpha=elbow_sphere[4])
    
    # Forearm (cylinder)
    forearm = create_cylinder_arm_segment(points[1], points[2], arm_model.forearm_radius, color='cornflowerblue')
    if forearm[0] is not None:
        ax.plot_surface(forearm[0], forearm[1], forearm[2], color=forearm[3], alpha=forearm[4])
    
    # Wrist/hand (sphere)
    wrist_sphere = create_sphere(points[2], arm_model.hand_radius, color='steelblue', alpha=0.8)
    ax.plot_surface(wrist_sphere[0], wrist_sphere[1], wrist_sphere[2], color=wrist_sphere[3], alpha=wrist_sphere[4])
    
    # Label the joints
    ax.text(points[0][0], points[0][1], points[0][2], 'Shoulder', color='white')
    ax.text(points[1][0], points[1][1], points[1][2], 'Elbow', color='white')
    ax.text(points[2][0], points[2][1], points[2][2], 'Wrist', color='white')
    
    # Plot motion history as trails (optional)
    if arm_model.wrist_history and len(arm_model.wrist_history) > 1:
        wrist_x = [p[0] for p in arm_model.wrist_history]
        wrist_y = [p[1] for p in arm_model.wrist_history]
        wrist_z = [p[2] for p in arm_model.wrist_history]
        ax.plot(wrist_x, wrist_y, wrist_z, 'r--', alpha=0.3)
    
    # Add a simple coordinate system at the shoulder
    arrow_length = 0.3
    ax.quiver(points[0][0], points[0][1], points[0][2], arrow_length, 0, 0, color='r')
    ax.quiver(points[0][0], points[0][1], points[0][2], 0, arrow_length, 0, color='g')
    ax.quiver(points[0][0], points[0][1], points[0][2], 0, 0, arrow_length, color='b')
    
    # Display current orientation values and raw accelerometer data
    angle_text = f"Elbow: Roll={arm_model.elbow_roll:.1f}°, Pitch={arm_model.elbow_pitch:.1f}°\n"
    angle_text += f"Wrist: Roll={arm_model.wrist_roll:.1f}°, Pitch={arm_model.wrist_pitch:.1f}°\n"
    
    # Add calibration status message
    if arm_model.calibration_message:
        angle_text += f"{arm_model.calibration_message}\n"
    elif arm_model.is_calibrating:
        angle_text += "Hold arm straight and steady...\n"
    elif arm_model.is_calibrated:
        angle_text += "CALIBRATED - Press 'C' to recalibrate\n"
    else:
        angle_text += "NOT CALIBRATED - Press 'C' to calibrate\n"
    
    # Add sample counts during calibration
    if arm_model.is_calibrating:
        wrist_samples = len(arm_model.calibration_samples_wrist.get('ax', []))
        elbow_samples = len(arm_model.calibration_samples_elbow.get('ax', []))
        angle_text += f"Collecting samples: Wrist={wrist_samples}, Elbow={elbow_samples}\n"
    
    ax.text2D(0.05, 0.95, angle_text, transform=ax.transAxes)

def main():
    # Initialize serial connection
    ser = initialize_serial()
    if not ser:
        print("Failed to open serial port. Exiting.")
        return
    
    # Create arm model
    arm_model = ArmModel()
    
    # Setup 3D plot
    fig, ax = setup_3d_plot()
    
    # Set up key press event handling
    fig.canvas.mpl_connect('key_press_event', lambda event: on_key_press(event, arm_model))
    
    print("Press 'C' during visualization to start the calibration process.")
    print("When calibrating, hold the arm straight for 3 seconds.")
    
    # Create animation
    ani = FuncAnimation(fig, update, fargs=(ser, ax, arm_model), interval=100)
    
    # Show the plot
    plt.show()
    
    # Clean up
    if ser and ser.is_open:
        ser.close()

if __name__ == "__main__":
    main()
