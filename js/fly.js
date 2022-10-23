function Flyy(options = { options }) {
    const DEFAULT_OPTIONS = { speed: 1, delta: 200, size_resistance: 50, maxSmallTurnDeg: 10, maxLargeTurnDeg: 150, maxWiggleDeg: 5 };
    this.options = {};
    for (var a in DEFAULT_OPTIONS) this.options[a] = (a in options ? options[a] : DEFAULT_OPTIONS[a]);
    this.img = document.createElement('img');
    document.body.appendChild(this.img);
    this.img.src = "/_images/fly.gif";
    this.img.style.position = 'fixed';
    this.toggle_stationary_counter = 10,
        this.edge_test_counter = 10,
        this.large_turn_counter = 0,
        this.small_turn_counter = 0,
        this.near_edge = false,
        this.top = 150,
        this.left = 150,
        this.angle_deg = 10,
        this.angle_rad = 10,
        this.direct = { 1: 270, 2: 90, 4: 0, 8: 180, 5: 315, 9: 225, 6: 45, 10: 135 },

        this.random = function(min, max, plusminus) {
            if (min == max) return min;
            var result = Math.round(min - 0.5 + (Math.random() * (max - min + 1)));
            if (plusminus) return Math.random() > 0.5 ? result : -result;
            return result;
        }

    this.bug_near_window_edge = function() {
        this.near_edge = 0;
        if (this.top < this.options.size_resistance)
            this.near_edge |= 1;
        else if (this.top > document.documentElement.clientHeight - this.options.size_resistance)
            this.near_edge |= 2;
        if (this.left < this.options.size_resistance)
            this.near_edge |= 4;
        else if (this.left > document.documentElement.clientWidth - this.options.size_resistance)
            this.near_edge |= 8;
        return this.near_edge;
    }

    this.onmove = function() {
        if (--this.edge_test_counter <= 0 && this.bug_near_window_edge()) {
            this.angle_deg %= 360;
            if (this.angle_deg < 0) this.angle_deg += 360;
            if (Math.abs(this.direct[this.near_edge] - this.angle_deg) > 15) {
                var angle1 = this.direct[this.near_edge] - this.angle_deg;
                var angle2 = (360 - this.angle_deg) + this.direct[this.near_edge];
                this.large_turn_angle_deg = (Math.abs(angle1) < Math.abs(angle2) ? angle1 : angle2);
                this.edge_test_counter = 10;
                this.large_turn_counter = 100;
                this.small_turn_counter = 30;
            }
        }
        if (--this.large_turn_counter <= 0) {
            this.large_turn_angle_deg = this.random(1, this.options.maxLargeTurnDeg, true);
            this.large_turn_counter = Math.round(Math.random() * 40);
        }
        if (--this.small_turn_counter <= 0) {
            this.angle_deg += this.random(1, this.options.maxSmallTurnDeg);
            this.small_turn_counter = Math.round(Math.random() * 10);
        } else {
            var dangle = this.random(1, this.options.maxWiggleDeg, true);
            if ((this.large_turn_angle_deg > 0 && dangle < 0) || (this.large_turn_angle_deg < 0 && dangle > 0)) {
                dangle = -dangle;
            }
            this.large_turn_angle_deg -= dangle;
            this.angle_deg += dangle;
        }
        this.angle_rad = this.angle_deg * (Math.PI / 180);
        var dx = Math.cos(this.angle_rad) * this.options.speed * (this.options.delta / 100);
        var dy = -Math.sin(this.angle_rad) * this.options.speed * (this.options.delta / 100);
        this.left += dx;
        this.top += dy;
        this.img.style.top = this.top + 'px';
        this.img.style.left = this.left + 'px';
        this.img.style.transform = 'rotate(' + (90 - this.angle_deg) + 'deg)';
        setTimeout(this.onmove.bind(this), 50);
    }
    this.onmove();
}

var f = new Flyy({ speed: 1.2 });