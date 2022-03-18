using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Events;

public class ReactHooksController : MonoBehaviour {
  //Interops
  [DllImport ("__Internal")]
  private static extern void SetPurpose (string message);

  //Subscribe to this for incoming messages from react
  public UnityEvent<string> OnSetBalance = new UnityEvent<string> ();

  //Invoke this for outgoing messages to react
  public UnityEvent<string> OnSetPurpose = new UnityEvent<string> ();

  private void Awake () {
    OnSetPurpose.AddListener (SetPurpose);
  }

  //Incoming messages, gets called by react
  public void SetBalance (string balance) => OnSetBalance.Invoke (balance);

}