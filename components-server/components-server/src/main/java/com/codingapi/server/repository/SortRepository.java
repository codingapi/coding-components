package com.codingapi.server.repository;

import com.codingapi.server.controller.SortRequest;
import com.codingapi.server.domain.ISort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface SortRepository<T extends ISort, ID> extends JpaRepository<T, ID> {


    default void reSort(SortRequest request) {
        T after = this.getReferenceById((ID) request.getAfterId());
        T before = this.getReferenceById((ID) request.getBeforeId());

        Integer beforeSort = before.getSort();
        Integer afterSort = after.getSort();

        before.setSort(afterSort);
        after.setSort(beforeSort);

        save(before);
        save(after);
    }

}
