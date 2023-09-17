import { getUserInfoFromStorage } from '@/api/getUserInfo';
import pb from '@/api/pockethost';
import EmptyContents from '@/components/EmptyContents';
import Spinner from '@/components/Spinner';
import Headerback from '@/components/header/Headerback';
import BookMarkItem from '@/components/mypage/BookMarkItem';
import UpNav from '@/components/nav/UpNav';
import HeartButton from '@/components/theme/HeartButton';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function BookMark() {
	const [bookMark, setBookMark] = useState(null);
	const [bookMarkId, setBookMarkId] = useState(null);
	const [record, setRecord] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const navigate = useNavigate();
	const userUId = getUserInfoFromStorage();

	// 즐겨찾기 기능
	const isClickHeart = async (item) => {
		if (bookMarkId.indexOf(`${item.id}`) < 0) {
			setBookMarkId((i) => [...i, `${item.id}`]);
			const userBookMarkSelete = {
				bookmark: [...bookMarkId, `${item.id}`],
			};

			await pb
				.collection('users')
				.update(`${userUId?.model.id}`, userBookMarkSelete);

			toast('즐겨찾기에 추가되었습니다', {
				icon: '⭐',
				duration: 2000,
			});
		} else {
			const userBookMarkCancle = bookMarkId.filter(
				(value) => value !== `${item.id}`
			);

			setBookMarkId(userBookMarkCancle);

			const updateBookMark = { bookmark: userBookMarkCancle };

			await pb
				.collection('users')
				.update(`${userUId?.model.id}`, updateBookMark);

			toast('즐겨찾기에 삭제되었습니다', {
				icon: '✖️',
				duration: 2000,
			});
		}
	};

	//스크롤탑 버튼 이벤트
	const handleTopButton = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	//스크롤 이벤트 감지
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (
				(currentScrollY >= 500 && !showPlusNav) ||
				(currentScrollY < 500 && showPlusNav)
			) {
				setShowPlusNav(currentScrollY >= 500);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [showPlusNav]);

	// 북마크 데이터 불러오기
	useEffect(() => {
		const userBookMarkData = async () => {
			const userBookMark = await pb
				.collection('users')
				.getOne(`${userUId?.model.id}`, {
					expand: 'bookmark, escapeList',
				});

			try {
				setBookMark(userBookMark.expand?.bookmark);
				setBookMarkId(userBookMark.bookmark);
				setRecord(userBookMark.escapeList);
				setIsLoading(true);
			} catch (err) {
				console.log(`북마크 불러오기 에러: ${err}`);
			}
		};

		userBookMarkData();
	}, [userUId?.model.id]);

	console.log(bookMark);
	console.log(record);

	return (
		<>
			<Helmet>
				<title>즐겨찾기</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					즐겨찾기
				</Headerback>
				{isLoading && bookMark.length === 0 && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<EmptyContents>즐겨찾기 목록이 없습니다 : &#40;</EmptyContents>
					</div>
				)}
				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{bookMark && bookMarkId && (
					<ul className="w-full px-20 s:px-12">
						{bookMark.map((item) => {
							return (
								<li key={item.id} className="relative">
									<BookMarkItem
										store={item.store}
										point={item.point}
										theme={item.theme}
										grade={item.grade}
										level={item.level}
										image={item.image}
										link={item.link}
										field={item.field}
									/>
									<HeartButton
										onClick={() => isClickHeart(item)}
										checked={
											bookMarkId.indexOf(`${item.id}`) < 0
												? 'bg-heartfalse'
												: 'bg-hearttrue'
										}
									/>
								</li>
							);
						})}
					</ul>
				)}
				<UpNav
					topClick={handleTopButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</>
	);
}

export default BookMark;
