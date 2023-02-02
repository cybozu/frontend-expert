import { PageLayout } from "../../components/PageLayout";
import styles from "./MembersPage.module.css";
import { members } from "../../utils/members";
import { MemberCard } from "../../components/MemberCard";
const MembersPage = () => {
  return (
    <PageLayout>
      <h2>Members</h2>
      <ul className={styles.members}>
        {members.map((member) => {
          return <MemberCard key={member.name} member={member} />;
        })}
      </ul>
    </PageLayout>
  );
};

export default MembersPage;
