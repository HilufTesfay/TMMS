import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const EquipCard = ({ equipment }) => {
  return (
    <Card
      style={{
        maxWidth: 500,
        height: "200px",
        margin: "20px auto",
        position: "absolute",
        zIndex: "1000",
        backgroundColor: "#f5f5f5", // Light gray background color
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a slight shadow for a nicer look
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Equipment List
        </Typography>
        <Divider style={{ margin: "10px 0" }} />
        <List>
          {equipment.map((equip, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Type: ${equip.type}`}
                secondary={`Status: ${equip.status}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

EquipCard.propTypes = {
  equipment: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EquipCard;
