import { NavLink, useMatch } from 'react-router-dom';
import { func } from 'prop-types';
import list1 from '@/assets/nav-list1.png';
import list2 from '@/assets/nav-list2.png';
import list3 from '@/assets/nav-list3.png';
import list4 from '@/assets/nav-list4.png';

Nav.propTypes = {
	onClick: func,
};

function Nav({ onClick = null }) {
	const isThemeActive = useMatch('/theme');
	const isRecordPageActive = useMatch('/recordpage');
	const isThemeRecordActive = useMatch('/theme/:dataId');
	const isUploadRecordActive = useMatch('/upload/:dataId');
	const isRecordCommunityActive = useMatch('/recordcommunity');
	const isPostPageActive = useMatch('/postpage');
	const isAddCommunityActive = useMatch('/addcommunity');
	const isCommentPageActive = useMatch('/postpage/:dataId');
	const isMyPageActive = useMatch('/mypage');
	const isMyPageEditActive = useMatch('/editpage');
	const isMyRecordActive = useMatch('/myrecord');
	const isMyCommunityActive = useMatch('/mycommunity');
	const isMyCommentActive = useMatch('/mycomment');
	const isBookMarkActive = useMatch('/bookmark');
	const isEditRecordActive = useMatch('/theme/edit/:dataId');
	const isCreateThemeActive = useMatch('/createtheme');

	return (
		<nav
			className="text-center bg-light-ec3 font-bold pb-2 pt-1 max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0"
			onClick={onClick}
		>
			<ul className="flex justify-around items-center">
				<li>
					<NavLink
						to="/theme"
						className={`text-light-ec1 hover:text-light-ec5 ${
							isCreateThemeActive || isThemeActive ? 'text-light-ec5' : ''
						}`}
					>
						<img className="w-12 h-12" src={list4} alt="테마" />
						<span aria-hidden="true">테마</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/recordcommunity"
						className={`text-light-ec1 hover:text-light-ec5 ${
							isRecordPageActive ||
							isThemeRecordActive ||
							isUploadRecordActive ||
							isRecordCommunityActive ||
							isEditRecordActive
								? 'text-light-ec5'
								: ''
						} flex flex-col items-center`}
					>
						<img className="w-12 h-12" src={list3} alt="기록창고" />
						<span aria-hidden="true">기록창고</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/postpage"
						className={`text-light-ec1 hover:text-light-ec5 ${
							isAddCommunityActive || isPostPageActive || isCommentPageActive
								? 'text-light-ec5'
								: ''
						}`}
					>
						<img className="w-12 h-12" src={list2} alt="커뮤니티" />
						<span aria-hidden="true">커뮤니티</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/mypage"
						className={`text-light-ec1 hover:text-light-ec5 ${
							isMyPageActive ||
							isMyRecordActive ||
							isBookMarkActive ||
							isMyPageEditActive ||
							isMyCommunityActive ||
							isMyCommentActive
								? 'text-light-ec5'
								: ''
						}`}
					>
						<img className="w-12 h-12" src={list1} alt="마이" />
						<span aria-hidden="true">마이</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
