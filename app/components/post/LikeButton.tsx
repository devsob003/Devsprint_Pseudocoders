import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, createStyles, Text } from "@mantine/core";
import classNames from "classnames";
import { FC, useCallback, useState } from "react";

const useStyles = createStyles((theme) => ({
	btn: {
		background: "transparent",
		height: "auto",
		transition: "all 80ms ease-in",
		padding: "0.5em 1em",
		borderRadius: "99999px",
		display: "flex",
		alignItems: "center",

		":hover": {
			background: "rgb(249, 24, 128)",

			svg: {
				color: "white",
			},
		},
	},

	icon: {
		marginRight: "15px",
		transition: "all 50ms ease-in",
	},

	active_icon: {
		color: "rgb(249, 24, 128)",
	},
}));

interface LikeButtonProps {
	likes: number;
	liked?: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ likes, liked = false }) => {
	const { classes } = useStyles();
	const [isLiked, setIsLiked] = useState<boolean>(liked);

	const handleClick = useCallback(() => {
		setIsLiked((liked) => !liked);
	}, [setIsLiked]);

	return (
		<Button className={classes.btn} onClick={handleClick}>
			<FontAwesomeIcon
				icon={isLiked ? faHeartSolid : faHeartRegular}
				fontSize={18}
				className={classNames({
					[classes.icon]: true,
					[classes.active_icon]: isLiked,
				})}
			/>
			<Text>{likes}</Text>
		</Button>
	);
};

export default LikeButton;
