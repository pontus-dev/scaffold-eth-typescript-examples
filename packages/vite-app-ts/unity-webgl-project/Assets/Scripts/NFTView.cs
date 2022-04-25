using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class NFTView : MonoBehaviour
{
    public ReactHooksController reactHooksController;
    public Text text;
    public NFTManager nftManager;
    int lastCount = 0;
    void Awake()
    {

    }

    void Update()
    {
        if (lastCount != nftManager.NFTs.Count)
        {
            text.text = $"We detected {nftManager.NFTs.Count} unique NFTs in your account";
        }
        lastCount = nftManager.NFTs.Count;
    }
}


