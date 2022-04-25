import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const BookTerm = (props) => {

    const history = useNavigate();
    const onMarkSubmit = (e) => {
        e.preventDefault();
        history("/books/mark/1")
        props.onMarkAsTaken(props.term.id);
        history("/books");
    }




    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.category}</td>
            <td>{props.term.author.name}</td>
            <td>{props.term.availableCopies}</td>
            {/*<td>{props.term.manufacturer.name}</td>*/}
            <td className={"text-right"}>
                <form onSubmit={onMarkSubmit}>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
                <Link className={"btn btn-info ml-2"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
                {/*<Link className={"btn btn-success ml-2"}*/}
                {/*      onClick={() => props.onMarkAsTaken(props.term.id)}*/}
                {/*      to={`/books/mark/${props.term.id}`}>*/}
                {/*    Mark as taken*/}
                {/*</Link>*/}
                {/*<a title={"Mark as Taken"} className={"btn btn-success ml-2"}*/}
                {/*   onClick={() => props.onMarkAsTaken(props.term.id)} to={`/books/mark/${props.term.id}`}>*/}
                {/*    Mark As Taken*/}
                {/*</a>*/}

                    <button className={"btn btn-success ml-2"}>Mark as taken</button>
                </form>
            </td>
        </tr>
    )
}

export default BookTerm;
