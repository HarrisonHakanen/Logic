package com.logic_back.logic_back.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.logic_back.logic_back.model.ConexaoDicom;

@Repository
public interface ConexaoDicomRepository extends JpaRepository<ConexaoDicom,Long> {
	
	@Query(value = "SELECT * FROM conexao_dicom_tbl WHERE ae_title = :aeTitle", nativeQuery = true)
    public List<ConexaoDicom> findByAeTitle(@Param("aeTitle") String aeTitle);

}
