using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NFTHolder : MonoBehaviour {
  public Queue<Transform> spots = new Queue<Transform> ();

  void Awake () {
    for (int row = 0; row < 10; row++) {
      for (int column = 0; column < 3; column++) {
        GameObject go = new GameObject ();
        go.name = "spot " + (row + column);
        go.transform.position = new Vector3 (column, 0, row);
        go.transform.SetParent (transform);
        spots.Enqueue (go.transform);
      }
    }
  }
}
