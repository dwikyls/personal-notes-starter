import { showFormattedDate } from "../utils";

function NoteCard({ id, title, body, archived, createdAt, onDelete, onArchieve }) {
    return (
        <div className="note-item">
            <div className="note-item__content">
                <h2 className="note-item__title">{title}</h2>
                <p className="note-item__date">{showFormattedDate(createdAt)}</p>
                <p className="note-item__body">{body}</p>
            </div>
            <div className="note-item__action">
                <button className="note-item__delete-button" onClick={() => onDelete(id)}>Hapus</button>
                <button className="note-item__archive-button" onClick={() => onArchieve(id, archived ? false : true)}>{archived ? 'Pindahkan' : 'Arsipkan'}</button>
            </div>
        </div>
    )
}

export default NoteCard;
