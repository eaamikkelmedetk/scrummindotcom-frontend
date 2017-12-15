import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TicketList from "../TicketList/TicketList";
import TicketForm from "../TicketForm/TicketForm";
import * as ActionCreators from "../../../Modules/Board/ActionCreators";
import PropTypes from "prop-types";

class TicketContainer extends React.Component {
  static propTypes = {
    ticketList: PropTypes.shape({
      columnId: PropTypes.number.isRequired,
      ticketIds: PropTypes.arrayOf(PropTypes.number).isRequired
    }),
    ticketForm: PropTypes.shape({
      columnId: PropTypes.number.isRequired,
      isTicketFormVisibile: PropTypes.bool
    })
  };

  render() {
    const { ticketList, ticketForm, actions } = this.props;
    return [
      <TicketList key="TicketList" {...ticketList} actions={actions} />,
      <TicketForm key="TicketForm" actions={actions} {...ticketForm} />
    ];
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { ticket: ticketEntity },
    boardUI: { column: UIColumns }
  } = state;
  const { ticketIds, columnId } = ownProps;

  return {
    ticketList: {
      columnId,
      ticketIds,
      ticketEntity
    },
    ticketForm: {
      columnId,
      isTicketFormVisible: UIColumns[columnId].isTicketFormVisibile
    }
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ ...ActionCreators }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketContainer);
