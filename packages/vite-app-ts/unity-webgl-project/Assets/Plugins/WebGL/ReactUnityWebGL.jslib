mergeInto(LibraryManager.library, {
  SetPurpose: function (message) {
    dispatchReactUnityEvent("SetPurpose", Pointer_stringify(message));
  }
});
