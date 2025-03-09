import { Canvas } from "fabric";
class HistoryCanvas extends Canvas {
  historyUndo = [];
  historyRedo = [];
  historyNextState = null;
  historyProcessing = false;
  extraProps = ['selectable', 'editable','wallColor','roomWidth','roomHeight','wallThickness', 'innerHeight','innerHeight'];

  constructor(element, options) {
    super(element, options);
    this._historyInit();
  }

  // Initialize the history
  _historyInit() {
    this.historyUndo = [];
    this.historyRedo = [];
    this.historyNextState = this.getCurrentState();
    this["on"]('object:added', (e) => this.saveHistory(e));
    this["on"]('object:removed', (e) => this.saveHistory(e));
    this["on"]('object:modified', (e) => this.saveHistory(e));
    this["on"]('object:skewing', (e) => this.saveHistory(e));
  }

  // Dispose the history
  _historyDispose() {
    // Detach event listeners individually
    // Detach event listeners individually
    this["off"]('object:added', this.saveHistory);
    this["off"]('object:removed', this.saveHistory);
    this["off"]('object:modified', this.saveHistory);
    this["off"]('object:skewing', this.saveHistory);
  }

  // Get the current state of the canvas as a string
  getCurrentState() {
    return JSON.stringify(this["toDatalessJSON"](this.extraProps));
  }

  // Save the state of the canvas into history stack
  saveHistory(e) {
    if (this.historyProcessing) return;
    if (this.historyNextState) {
      this.historyUndo.push(this.historyNextState);
    }
    this.historyNextState = this.getCurrentState();
  }

  // Undo the latest action
  undo(callback) {
    this.historyProcessing = true;

    const history = this.historyUndo.pop();
    if (history) {
      this.historyRedo.push(this.getCurrentState());
      this.historyNextState = history;
      this.loadHistory(history, 'history:undo', callback);
    } else {
      this.historyProcessing = false;
    }
  }

  // Redo the last undone action
  redo(callback) {
    this.historyProcessing = true;

    const history = this.historyRedo.pop();
    if (history) {
      this.historyUndo.push(this.getCurrentState());
      this.historyNextState = history;
      this.loadHistory(history, 'history:redo', callback);
    } else {
      this.historyProcessing = false;
    }
  }

  // Load the given history state
  loadHistory(history, event, callback) {
    let that = this;
    this["loadFromJSON"](history).then(function(){
      that["renderAll"]();
      that["fire"](event);
      that.historyProcessing = false;
      if (callback) callback();
    })
  }

  // Clear undo and redo stacks
  clearHistory() {
    this.historyUndo = [];
    this.historyRedo = [];
    this["fire"]('history:clear');
  }

  // Enable history tracking
  onHistory() {
    this.historyProcessing = false;
    this.saveHistory({});
  }

  // Disable history tracking
  offHistory() {
    this.historyProcessing = true;
  }

  // Check if undo is possible
  canUndo() {
    return this.historyUndo.length > 0;
  }

  // Check if redo is possible
  canRedo() {
    return this.historyRedo.length > 0;
  }
}

export default HistoryCanvas;