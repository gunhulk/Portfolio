function switchTab(tabID, header) {
  var tab = document.getElementById(tabID);
  var tabs = tab.parentElement;

  var tabChildren = tabs.children;
  for (var i = 0; i < tabChildren.length; i++) {
    tabChildren[i].style.display = "none";
  }

  tab.style.display = "inherit";

  var headers = Array.prototype.slice.call(
    document.getElementsByClassName("headers")
  );
  var headerChildren = Array.prototype.slice.call(headers[0].children);

  for (var i = 0; i < headerChildren.length; i++) {
    headerChildren[i].children[0].classList.remove("active");
  }
  header.children[0].className += " active";
}
