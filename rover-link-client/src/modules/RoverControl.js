import * as ROSLIB from "roslib";
import VirtualJoystick from "./virtualjoystick";

import "./virtualjoystick"

class RoverControl {
    constructor(ROS, linearSpeed, angularSpeed) {
        this.ROS = ROS
        this.topic = new ROSLIB.Topic({
            ros : ROS,
            name : "/cmd_vel/keyboard",
            messageType : 'geometry_msgs/Twist'
        });
        // directions and keycodes
        this.directions = {
            forward: 87,
            backward: 83,
            left: 65,
            right: 68,
        }
            // permanent throttle
        this.throttle = 6.0;
        this.currentMobileButton = null;
        this.joystick = new VirtualJoystick({container: document.getElementById('joystick-area')});

        // used to externally throttle the speed
        this.linearScale = (linearSpeed / 100);
        this.angularScale = (angularSpeed / 100);


        // linear x and y movement and angular z movement
        this.x = 0;
        this.y = 0;
        this.z = 0;
        if (window.innerWidth < 1024) {
            this.mobileControl()
        }
        this.controlListen();
    }

    set setLinearScale(value) {
        this.linearScale = (value / 100);
    }

     set setAngularScale(value) {
        this.angularScale = (value / 100);
    }



    handleTouch(up, down, left, right) {

        let linearSpeed = 0;
        let angularSpeed = 0;

        // throttle the speed by the slider and throttle constant

          linearSpeed = this.throttle * this.linearScale;
          angularSpeed = this.throttle * this.angularScale;

          if (left) {
              // turn left
              this.z = 1 * angularSpeed;
          }

          if (right) {
            // turn right
            this.z = -1 * angularSpeed;
          }

        if (down) {
          // down
          this.x = -0.25 * linearSpeed;
        }

        if (up) {
            // up
           this.x = 0.25 * linearSpeed;
        }




        const twist = new ROSLIB.Message({
            angular : {
              x : 0,
              y : 0,
              z : this.z
            },
            linear : {
              x : this.x,
              y : 0,
              z : 0
            }
          });
          this.topic.publish(twist);

    }

    handleKey(keyCode,keyDown) {
         // used to check for changes in speed
        let oldX = this.x;
        let oldY = this.y;
        let oldZ = this.z;

        let pub = true;

        let linearSpeed = 0;
        let angularSpeed = 0;

        // throttle the speed by the slider and throttle constant
        if (keyDown === true) {
          linearSpeed = this.throttle * this.linearScale;
          angularSpeed = this.throttle * this.angularScale;
        }
        // check which key was pressed
        switch (keyCode) {
          case 65:
          case 37:
            // turn left
            this.z = 1 * angularSpeed; //Compensate for weaker turning
            break;
          case 87:
          case 38:
            // up
            this.x = 0.25 * linearSpeed;
            break;
          case 68:
          case 39:
            // turn right
            this.z = -1 * angularSpeed;
            break;
          case 83:
          case 40:
            // down
            this.x = -0.25 * linearSpeed;
            break;
          case 69:
            //  right
            this.y = -0.5 * angularSpeed;
            break;
          case 81:
            // s left
            this.y = 0.5 * angularSpeed;
            break;
          default:
            pub = false;
        }

        // publish the command
        if (pub === true) {
          const twist = new ROSLIB.Message({
            angular : {
              x : 0,
              y : 0,
              z : this.z
            },
            linear : {
              x : this.x,
              y : 0,
              z : 0
            }
          });

          this.topic.publish(twist);


        }
    }

    controlListen() {
        // handle the key
      let body = document.getElementsByTagName('body')[0];
      body.addEventListener('keydown', (e) => {
        this.handleKey(e.keyCode, true);
      }, false);
      body.addEventListener('keyup', (e) => {
        this.handleKey(e.keyCode, false);
      }, false);
    };

    stopRobot() {
        this.handleKey(this.currentMobileButton, false);
        this.currentMobileButton = null;
        this.x = 0;
        this.z = 0;
    }


    mobileControl() {
         const body = document.getElementsByTagName("BODY")[0];
        console.log(body)
        body.style.cssText = "overscroll-behavior: none;"
        document.addEventListener("touchend", (e) => {
           this.stopRobot();
        });

        setInterval(() => {
            let right = this.joystick.right();
            let left = this.joystick.left();
            let up = this.joystick.up();
            let down = this.joystick.down();
            this.handleTouch(up, down, left, right);
        }, 100)
    }

}

export default RoverControl;