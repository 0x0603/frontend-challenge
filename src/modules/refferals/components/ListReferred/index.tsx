import React from "react";

import { ReferredFriend, mockReferredFriends } from "./mockData";
import styles from "./styles.module.scss";

interface ListReferredProps {
  friends?: ReferredFriend[];
}

const ListReferred: React.FC<ListReferredProps> = ({ friends = mockReferredFriends }) => {
  return (
    <div className={styles.listReferred}>
      <h2 className={styles.title + " " + "text-title"}>INVITED FRIENDS</h2>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Friend</div>
          <div className={styles.headerCell}>Trading Volume</div>
          <div className={styles.headerCell}>Status</div>
        </div>

        <div className={styles.tableBody}>
          {friends.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No friends invited yet</p>
            </div>
          ) : (
            friends.map((friend) => (
              <div key={friend.id} className={styles.tableRow}>
                <div className={styles.cell}>{friend.friend}</div>
                <div className={styles.cell}>{friend.tradingVolume}</div>
                <div
                  className={`${styles.cell} ${styles.status} ${styles[friend.status.toLowerCase()]}`}
                >
                  {friend.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListReferred;
