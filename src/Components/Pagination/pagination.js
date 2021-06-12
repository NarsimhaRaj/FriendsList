import React, { Component } from "react";
import './pagination.scss';

class Pagination extends Component {

    constructor(props){
        super(props);
    }
    render() {
        var html=[];
        if(this.props.currentPage!==1)
        {
            html.push(<button className="num-button">...</button>)
        }
        let currentPage = this.props.currentPage>this.props.totalPages-3 ? this.props.totalPages-3 :this.props.currentPage;
        let numOfButtons= currentPage+2;
        for (let i = currentPage; i <= numOfButtons; i++) {
            if (currentPage === i) {
                html.push(<button className="num-button" disabled>{i}</button>);
            } 
            else
                html.push(<button className="num-button" onClick={()=>this.props.onPageClick(i)}>{i}</button>);
        }
        if(this.props.currentPage<=(this.props.totalPages-2))
        {
            html.push(<button className="num-button">...</button>)
        }

        return (
            
            <React.Fragment>
                {
                    this.props.totalPages > 0 ?
                        <div className="pagination">
                            {html}
                        </div>
                        :
                        null
                }
            </React.Fragment>
        );
    }
}
export default Pagination;