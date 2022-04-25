using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;
using UnityEngine.Networking;
using System.Linq;

public class NFTManager : MonoBehaviour {
  public ReactHooksController reactHooksController;
  public List<NFT> NFTs { get => nfts; }
  List<NFT> nfts = new List<NFT> ();
  public NFTItemView NFTDisplayPrefab;
  public NFTHolder nftHolder;
  void Awake () {
    //reactHooksController.OnSetNFTs.AddListener (SetNFTs);
    //var jsonTextFile = Resources.Load<TextAsset> ("nfts");
    //nfts = JsonConvert.DeserializeObject<List<NFT>> (jsonTextFile.ToString ());
    //foreach (var nft in nfts) {
    //  var nftItemView = Instantiate (NFTDisplayPrefab);
    //  nftItemView.Data = nft;
    //  nftItemView.DownloadAndSetImage ();
    //  var spot = nftHolder.spots.Dequeue ();
    //  nftItemView.transform.position = spot.position;
    //}
  }

  private void SetNFTs (string nftJsonData) {
    if (nftJsonData == "" || nftJsonData == null) {
      //no data
    } else {
      Debug.Log ("Unity Received NFT data 🖼");
      nfts = JsonConvert.DeserializeObject<List<NFT>> (nftJsonData);
      foreach (var nft in nfts) {
        var nftItemView = Instantiate (NFTDisplayPrefab);
        nftItemView.Data = nft;
        nftItemView.DownloadAndSetImage ();
        var spot = nftHolder.spots.Dequeue ();
        nftItemView.transform.position = spot.position;
      }
    }
  }
}

public class NFT {
  public string token_address { get; set; }
  public string token_id { get; set; }
  public string contract_type { get; set; }
  public string token_uri { get; set; }
  public string metadata { get; set; }
  public string synced_at { get; set; }
  public string amount { get; set; }
  public string name { get; set; }
  public string symbol { get; set; }
  private Metadata _metadata;
  public Metadata Metadata {
    get {
      if (_metadata == null) {
        _metadata = JsonConvert.DeserializeObject<Metadata> (metadata);
      }
      return _metadata;
    }
  }
}

public class Attribute {
  public string trait_type { get; set; }
  public string value { get; set; }
}

public class Metadata {
  public string name { get; set; }
  public string description { get; set; }
  public string image { get; set; }
  public string external_url { get; set; }
  public int seller_fee_basis_points { get; set; }
  public string fee_recipient { get; set; }
  public string background_color { get; set; }
  //public Properties properties { get; set; }
  public List<Attribute> attributes { get; set; }
  public Splice splice { get; set; }
}

public class Properties {
  public string style_name { get; set; }
}

public class Color {
  public List<int> rgb { get; set; }
  public string hex { get; set; }
  public double freq { get; set; }
}

public class Origin {
  public string collection { get; set; }
  public string token_id { get; set; }
}

public class Splice {
  public List<Color> colors { get; set; }
  public long randomness { get; set; }
  public List<Origin> origins { get; set; }
  public string style_collection { get; set; }
  public string style_metadata_url { get; set; }
  public int style_token_id { get; set; }
}
