#include <Wire.h>
#include <MPU6050.h>

// Create MPU6050 objects with different I2C addresses
MPU6050 mpu1(0x68); // First MPU6050 (Wrist)
MPU6050 mpu2(0x69); // Second MPU6050 (Elbow)

void setup() {
    Serial.begin(115200);
    
    // Initialize I2C bus
    Wire.begin();

    // Initialize both MPU6050 sensors
    Serial.println("Initializing MPU6050 sensors...");

    mpu1.initialize();
    if (!mpu1.testConnection()) Serial.println("❌ MPU6050 (0x68) failed!");

    mpu2.initialize();
    if (!mpu2.testConnection()) Serial.println("❌ MPU6050 (0x69) failed!");

    Serial.println("✅ Both MPU6050 sensors initialized!");
}

void loop() {
    int16_t ax1, ay1, az1, gx1, gy1, gz1;
    int16_t ax2, ay2, az2, gx2, gy2, gz2;

    // Read data from first MPU6050
    mpu1.getMotion6(&ax1, &ay1, &az1, &gx1, &gy1, &gz1);

    // Read data from second MPU6050
    mpu2.getMotion6(&ax2, &ay2, &az2, &gx2, &gy2, &gz2);

    // Print sensor data
    Serial.print("MPU1 Accel: "); Serial.print(ax1); Serial.print(", "); Serial.print(ay1); Serial.print(", "); Serial.println(az1);
    Serial.print("MPU1 Gyro: "); Serial.print(gx1); Serial.print(", "); Serial.print(gy1); Serial.print(", "); Serial.println(gz1);

    Serial.print("MPU2 Accel: "); Serial.print(ax2); Serial.print(", "); Serial.print(ay2); Serial.print(", "); Serial.println(az2);
    Serial.print("MPU2 Gyro: "); Serial.print(gx2); Serial.print(", "); Serial.print(gy2); Serial.print(", "); Serial.println(gz2);

    Serial.println("----------------");
    delay(100);
}1`
