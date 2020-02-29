export const MyUtils = {
  applyCSS(self, uniqueName, cssRule) {
    let style = document.getElementById(uniqueName);
    if (!style) {
      style = document.createElement("style");
      style.id = uniqueName;
      style.type = "text/css";
      self.$el.appendChild(style);
    }
    style.innerHTML = cssRule;
  }
};
