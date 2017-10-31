const initialState = {
    "entities": {
      "ticket": {
        "1": {
          "id": 1,
          "title": "Køb mælk",
          "description": "Vi mangler mælk til havrefrasen imorgen."
        },
        "2": {
          "id": 2,
          "title": "Vask tøjet",
          "description": "Der skal vaskes så vi har rent tøj til imorgen"
        },
        "3": {
          "id": 3,
          "title": "Hent unger",
          "description": "Ungerne skal hentes i institutionen"
        },
        "4": {
          "id": 4,
          "title": "Lav madpakke",
          "description": "Der skal laves madpakker til ungerne"
        },
        "5": {
          "id": 5,
          "title": "Create",
          "description": "Create things"
        }
      },
      "column": {
        "1": {
          "id": 1,
          "title": "Backlog",
          "tickets": [
            1
          ]
        },
        "2": {
          "id": 2,
          "title": "Analysis",
          "tickets": [
            2
          ]
        },
        "3": {
          "id": 3,
          "title": "In-development",
          "tickets": [
            3
          ]
        },
        "4": {
          "id": 4,
          "title": "Client-review",
          "tickets": [
            4
          ]
        },
        "5": {
          "id": 5,
          "title": "Done",
          "tickets": [
            5
          ]
        }
      },
      "board": {
        "1": {
          "id": 1,
          "title": "portfolio",
          "columns": [
            1,
            2,
            3,
            4,
            5
          ]
        }
      }
    },
    "result": 1
  };

export const boardReducer = (state = initialState, action) => {
    switch(action.type) {
        default: {
            return state;
        }
    }
}