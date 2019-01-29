
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
        if (absSpeed < 20)
            pins.analogSetPeriod(AnalogPin.P0, 60000);
        else if (absSpeed < 30)
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
    export function drive(move:RobotMoves, speed: number) : void
    {
     
        let forward = (speed >= 0);
        let absSpeed = Math.abs(speed);
             if (speed > 100)
            speed = 100;
        else if (speed < -100)
            speed = -100;
         setPWM();
       let speedPositive = speed*10*forward;
       let speedNegative = speed*10*(!forward);
     

        if ((move == RobotMoves.Forward) || (move == RobotMoves.RotateLeft) || (move == RobotMoves.TurnLeft))
            pins.analogWritePin(AnalogPin.P13, speedPositive);
            pins.analogWritePin(AnalogPin.P14, speedNegative);  
         if ((move == RobotMoves.Backward) || (move == RobotMoves.RotateRight))
            pins.analogWritePin(AnalogPin.P13, speedNegative);
            pins.analogWritePin(AnalogPin.P14, speedPositive);  

         if ((move == RobotMoves.Forward) || (move == RobotMoves.RotateRight) || (move == RobotMoves.TurnRight))
            pins.analogWritePin(AnalogPin.P15, speedPositive);
            pins.analogWritePin(AnalogPin.P16, speedNegative);  
         if ((move == RobotMoves.Backward) || (move == RobotMoves.RotateLeft))
            pins.analogWritePin(AnalogPin.P15, speedNegative);
            pins.analogWritePin(AnalogPin.P16, speedPositive);  
    }

    /**
      * Drive robot forward (or backward) at speed for milliseconds.
      */
    //% blockId="bitbot_motor_forward_milliseconds" block="$move à la vitesse $speed\\% pendant %milliseconds|(ms)"
    //% speed.shadow="speedPicker"
    //% weight=95
    //% subcategory=Motors
    export function driveMilliseconds(move:RobotMoves, speed: number, milliseconds: number): void
    {
        drive(move,speed);
        basic.pause(milliseconds);
        drive(move,0);
    }

                                                           
                                                           
                                                               /**

      */
    //% blockId="bitbot_motor_stop" block="Arrêter les moteurs"
    //% weight=95
    //% subcategory=Motors
    export function stopMotor(): void
    {
        drive(RobotMoves.Forward,0);
    }
                                                        
}
