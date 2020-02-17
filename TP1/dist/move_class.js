"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Move = /** @class */ (function () {
    function Move(name, ratio, type, description, status, status_ratio, precision, physical, priority) {
        this.name = name;
        this.ratio = ratio;
        this.type = type;
        this.description = description;
        this.status = status;
        this.status_ratio = status_ratio;
        this.physical = physical;
        this.precision = precision;
        this.priority = priority;
    }
    return Move;
}());
exports.Move = Move;
//# sourceMappingURL=move_class.js.map