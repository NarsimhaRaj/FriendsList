import React, { Component } from "react";
import './pagination.scss';

class Pagination extends Component {

    constructor(props){
        super(props);
    }
    render() {        
        return (
            
            <React.Fragment>
                {
                    this.props.totalPages > 1 ?
                        <div className="pagination">
                            <button onClick={()=>this.props.onPageClick(this.props.currentPage-1)} disabled={this.props.currentPage == 1}>
                                {"<<prev"}
                            </button>
                                {`page ${this.props.currentPage} of ${this.props.totalPages}`}
                            <button onClick={()=>this.props.onPageClick(this.props.currentPage+1)} disabled={this.props.currentPage == this.props.totalPages}>
                                {"next>>"}
                            </button>
                        </div>
                        :
                        null
                }
            </React.Fragment>
        );
    }
}
export default Pagination;