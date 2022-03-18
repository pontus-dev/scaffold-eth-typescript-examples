using UnityEngine;
using UnityEngine.UI;

public class BalanceView : MonoBehaviour {
  public ReactHooksController hooks;
  public Text text;
  void Awake () {
    hooks.OnSetBalance.AddListener (SetText);
  }

  public void SetText (string balance) => text.text = $"Your Balance is: {balance}";
}