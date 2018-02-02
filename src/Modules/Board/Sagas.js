import axios from "axios";
import {
  COLUMN_ADD,
  COLUMN_ADD_SUCCESS,
  COLUMN_UPDATETITLE,
  COLUMN_UPDATETITLE_SUCCESS,
  COLUMN_REMOVE,
  COLUMN_REMOVE_SUCCESS,
  BOARD_GET_REQUEST,
  BOARD_GET_REQUEST_SUCCESS,
  TICKET_COLUMN_ADD,
  TICKET_COLUMN_ADD_SUCCESS,
  TICKET_COLUMN_REMOVE,
  TICKET_COLUMN_REMOVE_SUCCESS,
  COLUMN_MOVETICKETFROMTO,
  COLUMN_MOVETICKETFROMTO_SUCCESS,
  COLUMN_REORDER,
  COLUMN_REORDER_SUCCESS,
  TICKET_REORDER,
  TICKET_REORDER_SUCCESS,
  COLUMN_ACTIVATENAMEDITING
} from "./Actions";
import { normalize } from "normalizr";
import { boardEntity } from "../../Schemas/BoardSchema";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Api } from "../Api";

//Workers
function* getBoard(action) {
  const { boardId } = action.payload;

  yield put({
    type: "BOARD_GET_REQUEST_FETCHING",
    payload: {
      board: {
        meta: {
          isFetching: true
        }
      }
    }
  });

  try {
    const response = yield call(() => axios.get(Api.getBoard(boardId)));

    const { entities: { ticket, board, column } } = normalize(
      response.data,
      boardEntity
    );

    yield put({
      type: BOARD_GET_REQUEST_SUCCESS,
      payload: {
        ticket,
        column,
        board: {
          ...board,
          meta: {
            isFetching: false
          }
        }
      }
    });
  } catch (error) {
    yield put({
      type: "BOARD_GET_REQUEST_FAIL",
      payload: {
        board: {
          meta: {
            isFetching: false,
            error: "Der er opstået en fejl"
          }
        }
      }
    });
  }
}

function* addTicket(action) {
  const { columnid, title, description } = action.payload;

  try {
    const response = yield call(() =>
      axios.post(Api.addTicket, {
        Title: title,
        description: description,
        columnid: columnid
      })
    );

    yield put({
      type: TICKET_COLUMN_ADD_SUCCESS,
      payload: {
        id: response.data,
        title: title,
        description: description,
        columnid: columnid
      }
    });
  } catch (error) {}
}

function* removeTicket(action) {
  const { columnid, id } = action.payload;

  try {
    yield call(() => axios.delete(Api.removeTicket(id)));

    yield put({
      type: TICKET_COLUMN_REMOVE_SUCCESS,
      payload: {
        columnid,
        id
      }
    });
  } catch (error) {}
}

function* moveTicketFromColumn(action) {
  const { ticketId, fromColumn, toColumn } = action.payload;
  try {
    yield call(() => {
      axios.put(Api.moveTicketFromColumn(ticketId, toColumn));
    });

    yield put({
      type: COLUMN_MOVETICKETFROMTO_SUCCESS,
      payload: {
        fromColumn,
        toColumn,
        ticketId
      }
    });
  } catch (error) {}
}

function* addColumn(action) {
  const { boardId, title } = action.payload;

  try {
    const response = yield call(() =>
      axios.post(Api.addColumn, {
        title: title,
        boardid: boardId
      })
    );

    yield put({
      type: COLUMN_ADD_SUCCESS,
      payload: {
        id: response.data,
        title: title,
        boardId: boardId
      }
    });
  } catch (error) {}
}

function* removeColumn(action) {
  const { boardId, columnId } = action.payload;
  try {
    yield call(() => axios.delete(Api.removeColumn(columnId)));

    yield put({
      type: COLUMN_REMOVE_SUCCESS,
      payload: {
        boardId,
        columnId
      }
    });
  } catch (error) {}
}

function* reorderColumn(action) {
  const { boardId, columnIdMoveFrom, columnIdMoveTo } = action.payload;
  try {
    if (columnIdMoveFrom !== columnIdMoveTo) {
      yield call(() => {
        axios.put(Api.reorderColumn(columnIdMoveFrom, columnIdMoveTo));
      });

      yield put({
        type: COLUMN_REORDER_SUCCESS,
        payload: {
          boardId,
          columnIdMoveFrom,
          columnIdMoveTo
        }
      });
    }
  } catch (error) {}
}

function* reorderTicket(action) {
  const { columnId, ticketIdMoveFrom, ticketIdMoveTo } = action.payload;
  try {
    if (ticketIdMoveFrom !== ticketIdMoveTo) {
      yield call(() => {
        axios.put(Api.reorderTicket(ticketIdMoveFrom, ticketIdMoveTo));
      });

      yield put({
        type: TICKET_REORDER_SUCCESS,
        payload: {
          columnId,
          ticketIdMoveFrom,
          ticketIdMoveTo
        }
      });
    }
  } catch (error) {}
}

function* updateColumnTitle(action) {
  const { columnid, columnTitle } = action.payload;
  try {
    yield call(() =>
      axios.put(Api.updateColumn, {
        id: columnid,
        title: columnTitle
      })
    );

    yield put({
      type: COLUMN_UPDATETITLE_SUCCESS,
      payload: {
        columnid,
        columnTitle
      }
    });
  } catch (error) {}
}

// Watchers

//Root
export default function* boardSaga() {
  yield all([
    takeEvery(BOARD_GET_REQUEST, getBoard),
    takeEvery(TICKET_COLUMN_ADD, addTicket),
    takeEvery(TICKET_COLUMN_REMOVE, removeTicket),
    takeEvery(COLUMN_MOVETICKETFROMTO, moveTicketFromColumn),
    takeEvery(COLUMN_ADD, addColumn),
    takeEvery(COLUMN_UPDATETITLE, updateColumnTitle),
    takeEvery(COLUMN_REMOVE, removeColumn),
    takeLatest(COLUMN_REORDER, reorderColumn),
    takeEvery(TICKET_REORDER, reorderTicket)
  ]);
}
