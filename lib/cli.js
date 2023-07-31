const inquirer = require("inquirer");
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class runPrompt {
    run() {
        return inquirer
          .prompt([
            {
                name: "shape",
                type: "list",
                message: "Please select a shape.",
                choices: ["circle", "square", "triangle"],
            },
            {
                name: "shapeColor",
                type: "input",
                message: "Please enter a shape color.",
            },
            {
                name: "text",
                type: "input",
                message: "Please enter up to three letters for your logo."
            },
            {
                name: "textColor",
                type: "input",
                message: "Please enter a text color.",
            },
          ])
          .then(({ shape, shapeColor, text, textColor }) => {
            let shapeType;
            switch (shape) {
                case 'circle':
                    shapeType = new Circle();
                    break;

                case 'square':
                    shapeType = new Square();
                    break;
                
                case 'triangle':
                    shapeType = new Triangle();
                    break;
            }

            shapeType.setColor(shapeColor);

            const finalImage = new SVG();
            finalImage.setText(text, textColor);
            finalImage.setShape(shape);
            return finalImage;
          })
          .then(() => {
            writeFile('logo.svg', finalImage.render());
            console.log('Success! SVG generated!');
          })
          .catch((error) => {
            console.log(error);
            console.log('Something went wrong.');
          });
    }
}

module.exports = runPrompt;