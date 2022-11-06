import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, createStyles, Text } from "@mantine/core";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import classNames from "classnames";
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocFromServer,
	getDocs,
	increment,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../../services/firestore";

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
	postPublicKey: string;
}

const loadLikes = async (postPublicKey: string) => {
	const docRef = doc(db, "like-metrics", postPublicKey);
	const docSnap = await getDoc(docRef);
	return docSnap.exists() ? docSnap.data() : null;
};

const updateLikes = async (postPublicKey: string, liker: String, change: number) => {
	const docRef = doc(db, "like-metrics", postPublicKey);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		if (change < 0) {
			await updateDoc(docRef, {
				likers: arrayRemove(liker),
			});
		} else {
			await updateDoc(docRef, {
				likers: arrayUnion(liker),
			});
		}
	} else if (change < 0) throw Error("cannot decrement below 0");
	else {
		await setDoc(docRef, {
			likers: [liker],
		});
	}
};

const LikeButton: FC<LikeButtonProps> = ({ postPublicKey }) => {
	const { classes } = useStyles();
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [likes, setLikes] = useState<number>(0);
	const [loadingLikes, setLoadingLikes] = useState<boolean>(false);
	const [updatingLikes, setUpdatingLikes] = useState<boolean>(false);
	const { publicKey } = useWallet();
	const wallet = useAnchorWallet();
	const user = useMemo(() => publicKey?.toString(), [publicKey]);

	useEffect(() => {
		setLoadingLikes(true);
	}, [wallet]);

	useEffect(() => {
		if (!wallet || !loadingLikes || !user || !postPublicKey) return;

		loadLikes(postPublicKey)
			.then((data) => {
				if (data == null) setLikes(0);
				else {
					setLikes(data.likers.length);
					setIsLiked(data.likers.includes(user));
				}
			})
			.catch(() => {
				setLikes(0);
			})
			.finally(() => {
				setLoadingLikes(false);
			});
	}, [postPublicKey, loadingLikes, setLoadingLikes, setIsLiked, user, wallet]);

	const handleClick = useCallback(() => {
		if (user == null || !wallet) return;

		setUpdatingLikes(true);
		const change = isLiked ? -1 : 1;
		updateLikes(postPublicKey, user, change)
			.then(() => {
				setLikes((likes) => likes + change);
				setIsLiked((liked) => !liked);
			})
			.catch(() => {})
			.finally(() => {
				setUpdatingLikes(false);
			});
	}, [postPublicKey, setIsLiked, user, setUpdatingLikes, setLikes, isLiked, wallet]);

	return (
		<Button className={classes.btn} onClick={handleClick} disabled={loadingLikes || updatingLikes || !user}>
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
