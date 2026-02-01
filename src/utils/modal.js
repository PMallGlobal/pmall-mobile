import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function NewModal(props) {
    
    const [newModal, setNewModal] = useState(false);
    const handleModalClose = () => setNewModal(false);


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '70%',
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      };


    return (
        <Modal
        open={props.type}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">
                { props.title }
              </h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
            <section className="flex__normal">
            { props.children }
          </section>
        </Box>
      </Modal>
    );
  }