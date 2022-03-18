using UnityEngine;
using UnityEngine.UI;

public class SetPurposeButton : MonoBehaviour {
  public InputField inputField;
  public Button button;
  public ReactHooksController hooks;

  public void InvokeSetPurpose () {
    hooks.OnSetPurpose.Invoke (inputField.text);
  }
}
