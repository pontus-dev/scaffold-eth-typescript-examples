using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Events;

public class ReactHooksController : MonoBehaviour
{
    //Interops
    [DllImport("__Internal")]
    private static extern void SetPurpose(string message);

    //Subscribe to this for incoming messages from react
    public UnityEvent<string> OnSetNFTs = new UnityEvent<string>();

    //Invoke this for outgoing messages to react
    public UnityEvent<string> OnSetPurpose = new UnityEvent<string>();

    private void Awake()
    {
        OnSetPurpose.AddListener(SetPurpose);
    }

    //Incoming messages, gets called by react
    public void SetNFTs(string nftJsonData) => OnSetNFTs.Invoke(nftJsonData);

}
//{
//    token_address: string;
//    token_id: string;
//    contract_type: string;
//    token_uri?: string | undefined;
//    metadata?: string | undefined;
//    synced_at?: string | undefined;
//    amount?: string | undefined;
//    name: string;
//    symbol: string;
//}