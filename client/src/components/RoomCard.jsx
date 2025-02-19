import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import telegram from "../services/telegramService";

const RoomCard = ({ blockNumber, roomNumber, equipments }) => {
  return (
    <Card style={{ maxWidth: 345, margin: "20px auto", position: "relative" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Block: {blockNumber}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Room: {roomNumber}
        </Typography>
        <Divider style={{ margin: "10px 0" }} />
        <Typography variant="body1" component="div">
          Available Equipment:
        </Typography>
        <List>
          {equipments.map((equipment, index) => (
            <ListItem key={index}>
              <ListItemText primary={equipment} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={() => telegram.sendMessage(blockNumber, roomNumber)}
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            minWidth: "30px",
            height: "30px",
            fontSize: "12px",
            padding: "5px",
          }}
        >
          Share
        </Button>
      </CardContent>
    </Card>
  );
};

RoomCard.propTypes = {
  blockNumber: PropTypes.string.isRequired,
  roomNumber: PropTypes.string.isRequired,
  equipments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoomCard;
