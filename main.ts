
/**
  * Enumeration of motors.
  */
enum BBMotor
{
    //% block="gauche"
    Left,
    //% block="droit"
    Right,
    //% block="les deux"
    Both
}

/**
  * Enumeration of directions.
  */
enum BBRobotDirection
{
    //% block="à gauche"
    Left,
    //% block="à droite"
    Right
}


/**
  * Enumeration of movements.
  */
enum RobotMoves
{
    //% block="Avancer"
    Forward,
    //% block="Reculer"
    Backward,
     //% block="Pivoter vers la droite"
    RotateLeft,
     //% block="Pivoter vers la gauche"
    RotateRight,
     //% block="Tourner à droite"
    TurnRight,
     //% block="Tourner à gauche"
    TurnLeft
 
}

enum BBMode
{
    Manual,
    Auto
} 

/**
 * Custom blocks
 */
//% weight=50 color=#000000 icon="\A4Logo.jpg"
namespace robot
{
    let _updateMode = BBMode.Auto;
    let leftSpeed = 0;
    let rightSpeed = 0;

// Motor Blocks

    // slow PWM frequency for slower speeds to improve torque
    function setPWM(): void
    {
        if (absSpeed < 200)
            pins.analogSetPeriod(AnalogPin.P0, 60000);
        else if (absSpeed < 300)
            pins.analogSetPeriod(AnalogPin.P0, 40000);
        else
            pins.analogSetPeriod(AnalogPin.P0, 30000);
    }

    /**
      * Drive robot forward (or backward) at speed.
      * @param speed speed of motor between -1023 and 1023. eg: 600
      */
    //% blockId="bitbot_motor_forward" block="$move à la vitesse $speed\\%"
    //% speed.shadow="speedPicker"
    //% weight=100
     //% subcategory=Moteurs
    export function drive(move:RobotMoves, speed: number) { void
    {
        motor(BBMotor.Both, speed);
     
        let forward = (speed >= 0);
        let absSpeed = Math.abs(speed);
             if (speed > 100)
            speed = 100;
        else if (speed < -100)
            speed = -100;
     
     
        if ((move == RobotMoves.Forward) || (move == RobotMoves.Forward)  )
            leftSpeed = absSpeed;
        if ((motor == BBMotor.Right) || (motor == BBMotor.Both))
            rightSpeed = absSpeed;
        setPWM();


        let realSpeed = speed;
        if (!forward)
        {
            if (realSpeed >= -200)
                realSpeed = Math.idiv(realSpeed * 19, 6);
            else if (realSpeed >= -400)
                realSpeed = realSpeed * 2;
            else if (realSpeed >= -600)
                realSpeed = Math.idiv(realSpeed * 3, 2);
            else if (realSpeed >= -800)
                realSpeed = Math.idiv(realSpeed * 5, 4);
            realSpeed = 1023 + realSpeed; // realSpeed is negative!
        }

        if ((motor == BBMotor.Left) || (motor == BBMotor.Both))
        {
            pins.analogWritePin(AnalogPin.P0, realSpeed);
            pins.digitalWritePin(DigitalPin.P8, forward ? 0 : 1);
        }

        if ((motor == BBMotor.Right) || (motor == BBMotor.Both))
        {
            pins.analogWritePin(AnalogPin.P1, realSpeed);
            pins.digitalWritePin(DigitalPin.P12, forward ? 0 : 1);
        }
    }

    /**
      * Drive robot forward (or backward) at speed for milliseconds.
      * @param speed speed of motor between -1023 and 1023. eg: 600
      * @param milliseconds duration in milliseconds to drive forward for, then stop. eg: 400
      */
    //% blockId="bitbot_motor_forward_milliseconds" block="$move à la vitesse $speed\\% pendant %milliseconds|(ms)"
    //% speed.shadow="speedPicker"
    //% weight=95
    //% subcategory=Motors
    export function driveMilliseconds(move:RobotMoves, speed: number, milliseconds: number): void
    {
        drive(speed);
        basic.pause(milliseconds);
        drive(0);
    }

    /**
      * Turn robot in direction at speed.
      * @param direction direction to turn.
      * @param speed speed of motor between 0 and 1023. eg: 600
      */
    //% blockId="bitbot_turn" block="spin %direction|at speed %speed"
    //% speed.min=0 speed.max=1023
    //% weight=90
    //% subcategory=Motors
    export function driveTurn(direction: BBRobotDirection, speed: number): void
    {
        if (speed < 0)
            speed = 0;
        if (direction == BBRobotDirection.Left)
        {
            motor(BBMotor.Left, -speed);
            motor(BBMotor.Right, speed);
        }
        else if (direction == BBRobotDirection.Right)
        {
            motor(BBMotor.Left, speed);
            motor(BBMotor.Right, -speed);
        }
    }

    /**
      * Spin robot in direction at speed for milliseconds.
      * @param direction direction to turn.
      * @param speed speed of motor between 0 and 1023. eg: 600
      * @param milliseconds duration in milliseconds to turn for, then stop. eg: 400
      */
    //% blockId="bitbot_turn_milliseconds" block="spin %direction|at speed %speed| for %milliseconds|(ms)"
    //% speed.min=0 speed.max=1023
    //% weight=85
    //% subcategory=Motors
    export function driveTurnMilliseconds(direction: BBRobotDirection, speed: number, milliseconds: number): void
    {
        driveTurn(direction, speed)
        basic.pause(milliseconds)
        motor(BBMotor.Both, 0)
    }

    /**
      * Drive motor(s) forward or reverse.
      * @param motor motor to drive.
      * @param speed speed of motor (-1023 to 1023). eg: 600
      */
    //% blockId="bitbot_motor" block="drive %motor|motor(s) at speed %speed"
    //% weight=80
    //% subcategory=Motors
    export function motor(motor: BBMotor, speed: number): void
    {
        let forward = (speed >= 0);
        let absSpeed = Math.abs(speed);
        if ((motor == BBMotor.Left) || (motor == BBMotor.Both))
            leftSpeed = absSpeed;
        if ((motor == BBMotor.Right) || (motor == BBMotor.Both))
            rightSpeed = absSpeed;
        setPWM();

        if (speed > 1023)
            speed = 1023;
        else if (speed < -1023)
            speed = -1023;

        let realSpeed = speed;
        if (!forward)
        {
            if (realSpeed >= -200)
                realSpeed = Math.idiv(realSpeed * 19, 6);
            else if (realSpeed >= -400)
                realSpeed = realSpeed * 2;
            else if (realSpeed >= -600)
                realSpeed = Math.idiv(realSpeed * 3, 2);
            else if (realSpeed >= -800)
                realSpeed = Math.idiv(realSpeed * 5, 4);
            realSpeed = 1023 + realSpeed; // realSpeed is negative!
        }

        if ((motor == BBMotor.Left) || (motor == BBMotor.Both))
        {
            pins.analogWritePin(AnalogPin.P0, realSpeed);
            pins.digitalWritePin(DigitalPin.P8, forward ? 0 : 1);
        }

        if ((motor == BBMotor.Right) || (motor == BBMotor.Both))
        {
            pins.analogWritePin(AnalogPin.P1, realSpeed);
            pins.digitalWritePin(DigitalPin.P12, forward ? 0 : 1);
        }
    }

