mergeInto(LibraryManager.library, {
  SetCollectibles: function (jsonData) {
    dispatchReactUnityEvent("SetCollectibles", Pointer_stringify(jsonData));
  }
});
