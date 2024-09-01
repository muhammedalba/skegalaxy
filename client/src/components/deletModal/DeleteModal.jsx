
import PropTypes from "prop-types";

const DeleteModal = ({ show, onClose, onDelete, onCleaar,itemId }) => {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden={!show} style={{ display: show ? 'block' : 'none' ,backgroundColor:'#021526b4'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">حذف العنصر</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body">
            هل أنت متأكد أنك تريد حذف هذا العنصر؟
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>إلغاء</button>
            <button type="button" className="btn btn-danger" onClick={() => onDelete(itemId)}>حذف</button>
          </div>
        </div>
      </div>
    </div>
  );
};
DeleteModal.propTypes = {
    show: PropTypes.bool.isRequired,
  itemId: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
 
   
  };
export default DeleteModal;
