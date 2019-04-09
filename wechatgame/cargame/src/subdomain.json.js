module.exports = [
  [
    {
      "__type__": "cc.Prefab",
      "_name": "RankItem",
      "data": {
        "__id__": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "RankItem",
      "_children": [
        {
          "__id__": 2
        },
        {
          "__id__": 3
        },
        {
          "__id__": 5
        },
        {
          "__id__": 7
        },
        {
          "__id__": 9
        }
      ],
      "_level": 1,
      "_components": [
        {
          "__type__": "f5e13ZA9itJYZ0SztxeMDXm",
          "node": {
            "__id__": 1
          },
          "backSprite": {
            "__id__": 2
          },
          "rankLabel": {
            "__id__": 4
          },
          "avatarImgSprite": {
            "__id__": 6
          },
          "nickLabel": {
            "__id__": 8
          },
          "topScoreLabel": {
            "__id__": 10
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "c2WqQ9gfVClJ3kyrhIDLhZ"
        },
        "fileId": "e5KstPkUxMlIae8gpbnoOg"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 90
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "bgSprite",
      "_parent": {
        "__id__": 1
      },
      "_active": false,
      "_level": 3,
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 2
          },
          "_sizeMode": 0
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "c2WqQ9gfVClJ3kyrhIDLhZ"
        },
        "fileId": "a9SkdNV25NL6Iic4UkOCD9"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 90
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "rankLabel",
      "_parent": {
        "__id__": 1
      },
      "_level": 3,
      "_components": [
        {
          "__id__": 4
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "c2WqQ9gfVClJ3kyrhIDLhZ"
        },
        "fileId": "1euNEmfRVLS5djqdp8gu3m"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 33.37,
        "height": 60
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": -270
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Label",
      "node": {
        "__id__": 3
      },
      "_useOriginalSize": false,
      "_string": "1",
      "_N$string": "1",
      "_fontSize": 60,
      "_lineHeight": 60,
      "_N$horizontalAlign": 1,
      "_N$verticalAlign": 1
    },
    {
      "__type__": "cc.Node",
      "_name": "avatarImgSprite",
      "_parent": {
        "__id__": 1
      },
      "_level": 3,
      "_components": [
        {
          "__id__": 6
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "c2WqQ9gfVClJ3kyrhIDLhZ"
        },
        "fileId": "2cOY6QKCtMiaVYcOmP6k1M"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 70,
        "height": 70
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": -200
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Sprite",
      "node": {
        "__id__": 5
      },
      "_sizeMode": 0
    },
    {
      "__type__": "cc.Node",
      "_name": "nickLabel",
      "_parent": {
        "__id__": 1
      },
      "_level": 3,
      "_components": [
        {
          "__id__": 8
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "c2WqQ9gfVClJ3kyrhIDLhZ"
        },
        "fileId": "8eHZBSsvtE8ZdG5vDXRnQ/"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 300,
        "height": 60
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": 10
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Label",
      "node": {
        "__id__": 7
      },
      "_useOriginalSize": false,
      "_string": "玩家昵称",
      "_N$string": "玩家昵称",
      "_fontSize": 60,
      "_lineHeight": 60,
      "_N$verticalAlign": 1,
      "_N$overflow": 1
    },
    {
      "__type__": "cc.Node",
      "_name": "topScoreLabel",
      "_parent": {
        "__id__": 1
      },
      "_level": 3,
      "_components": [
        {
          "__id__": 10
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "c2WqQ9gfVClJ3kyrhIDLhZ"
        },
        "fileId": "d2KSukeUZOIrZ/D64PExhp"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 166.85,
        "height": 60
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "x": 1,
        "y": 0.5
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": 300
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Label",
      "node": {
        "__id__": 9
      },
      "_useOriginalSize": false,
      "_string": "10000",
      "_N$string": "10000",
      "_fontSize": 60,
      "_lineHeight": 60,
      "_N$horizontalAlign": 2,
      "_N$verticalAlign": 1
    }
  ],
  [
    {
      "__type__": "cc.SceneAsset",
      "_name": "GameRankingList",
      "scene": {
        "__id__": 1
      },
      "asyncLoadAssets": null
    },
    {
      "__type__": "cc.Scene",
      "_name": "New Node",
      "_children": [
        {
          "__id__": 2
        }
      ],
      "_active": false,
      "_anchorPoint": {
        "__type__": "cc.Vec2"
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 0.19461669921875,
        "y": 0.19461669921875,
        "z": 1
      },
      "autoReleaseAssets": false
    },
    {
      "__type__": "cc.Node",
      "_name": "Canvas",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 3
        },
        {
          "__id__": 4
        }
      ],
      "_level": 1,
      "_components": [
        {
          "__type__": "cc.Canvas",
          "node": {
            "__id__": 2
          },
          "_designResolution": {
            "__type__": "cc.Size",
            "width": 720,
            "height": 1280
          }
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 720,
        "height": 1280
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": 360,
        "y": 640
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      },
      "_id": "4e1wIY73FOR6GkICcOTbpA"
    },
    {
      "__type__": "cc.Node",
      "_name": "Main Camera",
      "_parent": {
        "__id__": 2
      },
      "_level": 2,
      "_components": [
        {
          "__type__": "cc.Camera",
          "node": {
            "__id__": 3
          },
          "_clearFlags": 7,
          "_depth": -1
        }
      ],
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "GameRankingList",
      "_parent": {
        "__id__": 2
      },
      "_children": [
        {
          "__id__": 5
        },
        {
          "__id__": 13
        },
        {
          "__id__": 14
        }
      ],
      "_level": 2,
      "_components": [
        {
          "__type__": "5ef0boUISBPcrg8NkCRJC5z",
          "node": {
            "__id__": 4
          },
          "rankingScrollView": {
            "__id__": 10
          },
          "scrollViewContent": {
            "__id__": 11
          },
          "prefabRankItem": {
            "__uuid__": "c2WqQ9gfVClJ3kyrhIDLhZ"
          },
          "loadingLabel": {
            "__id__": 14
          }
        }
      ],
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "rankingScrollView",
      "_parent": {
        "__id__": 4
      },
      "_children": [
        {
          "__id__": 6
        },
        {
          "__id__": 12
        }
      ],
      "_level": 3,
      "_components": [
        {
          "__id__": 10
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 700
      },
      "_position": {
        "__type__": "cc.Vec3",
        "y": 70
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "scrollBar",
      "_parent": {
        "__id__": 5
      },
      "_children": [
        {
          "__id__": 7
        }
      ],
      "_components": [
        {
          "__id__": 9
        },
        {
          "__type__": "cc.Widget",
          "node": {
            "__id__": 6
          },
          "alignMode": 0,
          "_alignFlags": 37,
          "_left": 350.07654921020657,
          "_right": -12,
          "_originalHeight": 237
        },
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 6
          },
          "_type": 1,
          "_sizeMode": 0
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 12,
        "height": 700
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "x": 1,
        "y": 0.5
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": 312
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "bar",
      "_parent": {
        "__id__": 6
      },
      "_components": [
        {
          "__id__": 8
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 10,
        "height": 30
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "x": 1
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": -1
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Sprite",
      "node": {
        "__id__": 7
      },
      "_type": 1,
      "_sizeMode": 0
    },
    {
      "__type__": "cc.Scrollbar",
      "node": {
        "__id__": 6
      },
      "_scrollView": {
        "__id__": 10
      },
      "_N$handle": {
        "__id__": 8
      },
      "_N$direction": 1
    },
    {
      "__type__": "cc.ScrollView",
      "node": {
        "__id__": 5
      },
      "horizontal": false,
      "brake": 0.75,
      "bounceDuration": 0.23,
      "_N$content": {
        "__id__": 11
      },
      "content": {
        "__id__": 11
      },
      "_N$horizontalScrollBar": null,
      "_N$verticalScrollBar": {
        "__id__": 9
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "scrollViewcontent",
      "_parent": {
        "__id__": 12
      },
      "_components": [
        {
          "__type__": "cc.Layout",
          "node": {
            "__id__": 11
          },
          "_layoutSize": {
            "__type__": "cc.Size",
            "width": 600,
            "height": 90
          },
          "_resize": 1,
          "_N$layoutType": 2,
          "_N$spacingY": 10
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 90
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "x": 0.5,
        "y": 1
      },
      "_position": {
        "__type__": "cc.Vec3",
        "y": -170
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "view",
      "_parent": {
        "__id__": 5
      },
      "_children": [
        {
          "__id__": 11
        }
      ],
      "_components": [
        {
          "__type__": "cc.Mask",
          "node": {
            "__id__": 12
          }
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 700
      },
      "_position": {
        "__type__": "cc.Vec3",
        "y": 50
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "gameOverRankLayout",
      "_parent": {
        "__id__": 4
      },
      "_level": 3,
      "_components": [
        {
          "__type__": "cc.Layout",
          "node": {
            "__id__": 13
          },
          "_layoutSize": {
            "__type__": "cc.Size",
            "width": 600,
            "height": 200
          },
          "_N$layoutType": 1
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 200
      },
      "_position": {
        "__type__": "cc.Vec3",
        "y": -270
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "loadingLabel",
      "_parent": {
        "__id__": 4
      },
      "_level": 3,
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 14
          },
          "_useOriginalSize": false,
          "_string": "加载ing......",
          "_N$string": "加载ing......",
          "_fontSize": 60,
          "_lineHeight": 60,
          "_N$horizontalAlign": 1,
          "_N$verticalAlign": 1
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 300.09,
        "height": 60
      },
      "_position": {
        "__type__": "cc.Vec3",
        "y": 130
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    }
  ]
];
