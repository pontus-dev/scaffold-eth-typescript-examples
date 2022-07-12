using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Events;

public class ReactHooksController : MonoBehaviour
{
    //Subscribe to this for incoming messages from react
    public UnityEvent<string> CollectiblesSetEvent = new UnityEvent<string>();

    //Incoming messages, gets called by react
    public void SetCollectibles(string json) => CollectiblesSetEvent.Invoke(json);

}