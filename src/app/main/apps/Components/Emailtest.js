import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { sendEmailToOne, sendEmailToAll } from '../../connection/Servers';
import { ToastContainer, toast } from 'react-toastify';

// const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
	avatar: {
		backgroundColor: blue[100],
		color: blue[600]
	}
});

function SimpleDialog(props) {
	const classes = useStyles();
	const { onClose, open, emails, handleEmailsToAll, handleEmailToOne } = props;

	const handleClose = type => {
		onClose(type);
	};

	const handleSendEmailToOne = async value => {
		console.log(value);
		handleClose('close');
		let res = await sendEmailToOne({ email: value });
		if (res.data.success === true) {
			toast.success(res.data.message, {
				position: toast.POSITION.TOP_RIGHT
			});
			// handleUpdate(true);
		} else {
			toast.error(res.data.message, {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	};

	const handleSendEmailToAll = async emails => {
		console.log(emails);
		handleClose('close');
		let res = await sendEmailToAll({ emails: emails });
		if (res.data.success === true) {
			toast.success(res.data.message, {
				position: toast.POSITION.TOP_RIGHT
			});
			// handleUpdate(true);
		} else {
			toast.error(res.data.message, {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	};

	return (
		<Dialog aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle id="simple-dialog-title">Send Test Email</DialogTitle>
			<List>
				{emails.map(email => (
					<ListItem button onClick={() => handleSendEmailToOne(email)} key={email}>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={email} />
					</ListItem>
				))}

				<ListItem className="w-100 text-center " autoFocus button>
					<button className="btn btn-outline-danger mx-2 " onClick={() => handleClose('close')}>
						Cancel
					</button>
					<button onClick={() => handleSendEmailToAll(emails)} className="btn btn-primary ">
						Send Email to All <i class="far fa-paper-plane"></i>
					</button>
				</ListItem>
			</List>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired
};

export default function Emailtest({ data, handleOpen, open, handleClose }) {
	// const [open, setOpen] = React.useState(false);
	// const [selectedValue, setSelectedValue] = React.useState(emails[1]);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	// const handleClose = value => {
	// 	setOpen(false);
	// 	setSelectedValue(value);
	// };

	return (
		<div>
			{console.log(open, data, handleOpen)}
			{/* <Button variant="outlined" color="primary" onClick={handleOpen}>
				Open simple dialog
			</Button> */}
			<SimpleDialog open={open} onClose={handleOpen} emails={data} />
		</div>
	);
}
