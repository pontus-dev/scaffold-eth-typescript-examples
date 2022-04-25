using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Networking;

public class NFTItemView : MonoBehaviour {
  public SpriteRenderer spriteRenderer;
  public NFT Data { get; internal set; }

  IEnumerator DownloadImage (string uri) {
    UnityWebRequest www = UnityWebRequestTexture.GetTexture (uri);
    yield return www.SendWebRequest ();

    if (www.result != UnityWebRequest.Result.Success) {
      Debug.Log (www.error);
      Debug.Log (www.downloadHandler.error);
    } else {
      Debug.Log ("result was not error");
      Texture2D texture = ((DownloadHandlerTexture)www.downloadHandler).texture;
      Rect rect = new Rect (0, 0, texture.width, texture.height);
      spriteRenderer.sprite = Sprite.Create (texture, rect, new Vector2 (0.5f, 0.5f));
      spriteRenderer.enabled = true;
    }
  }

  internal void DownloadAndSetImage () {
    StartCoroutine (DownloadImage (Data.Metadata.image));
  }
}
