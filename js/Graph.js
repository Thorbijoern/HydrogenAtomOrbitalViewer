function Graph(config) {
        // user defined properties
        this.canvas = document.getElementById(config.canvasId);
        this.minX = config.minX;
        this.minY = config.minY;
        this.maxX = config.maxX;
        this.maxY = config.maxY;
        this.unitsPerTick = config.unitsPerTick;

        // constants
        this.axisColor = '#ffffff';
        this.font = '8pt Calibri';
        this.tickSize = 5;

        // relationships
        this.context = this.canvas.getContext('2d');
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = (this.canvas.width - 52) / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * (this.canvas.width - 52));
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = (this.canvas.width - 52) / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;

        // draw x and y axis
        this.drawXAxis();
        this.drawYAxis();
    }

    Graph.prototype.drawXAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo((this.canvas.width - 52), this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 1;
        context.stroke();

        // draw tick marks
        var xPosIncrement = this.unitsPerTick * this.unitX;
        var xPos, unit;
        context.font = this.font;
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = "8pt Bubbler One"
        context.textBaseline = 'top';

        // draw left tick marks
        xPos = this.centerX - xPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (xPos > 0) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            //context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit -= this.unitsPerTick;
            xPos = Math.round(xPos - xPosIncrement);
        }

        // draw right tick marks
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while (xPos < (this.canvas.width - 52)) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit += this.unitsPerTick;
            xPos = Math.round(xPos + xPosIncrement);
        }
        context.moveTo(this.canvas.width - 52, this.centerY + this.tickSize / 2 - 3);
        context.lineTo(this.canvas.width - 55, this.centerY + this.tickSize / 2 - 5);
        context.stroke(); 
        context.moveTo(this.canvas.width - 52, this.centerY + this.tickSize / 2 - 3); 
        context.lineTo(this.canvas.width - 55, this.centerY + this.tickSize / 2);
        context.stroke(); 
        context.fillText('r [Bohr radii]' , (this.canvas.width - 26), this.centerY + this.tickSize / 2 - 10);  
        context.restore();
    };

    Graph.prototype.drawYAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 10);
        context.lineTo(this.centerX, this.canvas.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 1;
        context.stroke();
        context.moveTo(this.centerX, 10 );
        context.lineTo(this.centerX + 5, 15);
        context.stroke();      
        context.moveTo(this.centerX, this.canvas.height);
        context.lineTo(this.centerX + 5, this.canvas.height - 5);
        context.stroke();
        context.font = this.font;
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = "8pt Bubbler One"
        context.textBaseline = 'top';
        context.fillText("R (r)" , this.centerX + 8, 0);  
        context.restore();
    };
    Graph.prototype.update = function(minY,maxY){
        this.minY = minY;
        this.maxY = maxY;
        this.rangeY = this.maxY - this.minY;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.scaleY = this.canvas.height / this.rangeY;        
    };
    Graph.prototype.drawEquation = function(equation, color, thickness) {
        var context = this.context;
        var MY = 0;
        let points = [];
        for (var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
            let temp =  equation(x, 0, 0);
            if(temp > MY)
                MY = temp;
            points.push([x,temp]);
        }
        this.update(-MY*1.2, MY*1.2);
        context.save();
        context.save();
        this.transformContext();

        context.beginPath();
        context.moveTo(this.minX, equation(this.minX, 0, 0));
        
        points.forEach(e=>context.lineTo(e[0], e[1]));
        context.restore();
        context.lineJoin = 'round';
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
    };

    Graph.prototype.transformContext = function() {
        var context = this.context;

        // move context to center of canvas
        this.context.translate(this.centerX, this.centerY);

        /*
         * stretch grid to fit the canvas window, and
         * invert the y scale so that that increments
         * as you move upwards
         */
        context.scale(this.scaleX, -this.scaleY);
    };