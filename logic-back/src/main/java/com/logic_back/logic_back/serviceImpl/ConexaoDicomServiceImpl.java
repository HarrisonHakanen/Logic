package com.logic_back.logic_back.serviceImpl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.logic_back.logic_back.model.ConexaoDicom;
import com.logic_back.logic_back.repository.ConexaoDicomRepository;
import com.logic_back.logic_back.service.ConexaoDicomService;


@Service
public class ConexaoDicomServiceImpl implements ConexaoDicomService{

	@Autowired
    private ConexaoDicomRepository conexaoDicomRepository;

    @Override
    public ConexaoDicom save(ConexaoDicom product) {
        return conexaoDicomRepository.save(product);
    }

    @Override
    public List<ConexaoDicom> findAll() {
        return conexaoDicomRepository.findAll();
    }

    @Override
    public Optional<ConexaoDicom> findById(Long id) {
        return conexaoDicomRepository.findById(id);
    }

    @Override
    public ConexaoDicom update(ConexaoDicom conexaoDicom) {
        return conexaoDicomRepository.save(conexaoDicom);
    }

    @Override
    public void deleteById(Long id) {
    	conexaoDicomRepository.deleteById(id);
    }
    
    public List<ConexaoDicom> findByAeTitle(String aeTitle){
    	return conexaoDicomRepository.findByAeTitle(aeTitle);
    }
    
    public ResponseEntity<ConexaoDicom> create (ConexaoDicom conexaoDicom) {
    	
    	try {
    		
    		if(conexaoDicom.getIdConexaoDicom()==null) {
        		conexaoDicom.setIdConexaoDicom(0l);
        	}
    		
    		List<ConexaoDicom> listConexaoDicom = findByAeTitle(conexaoDicom.getAeTitle());
        	
    		
    		if(!listConexaoDicom.isEmpty()) {
    			return ResponseEntity.status(450).body(null);
    		}
        	if(conexaoDicom.getDescricao().length()<2 || conexaoDicom.getDescricao().length()>255) {
        		return ResponseEntity.status(451).body(null);
        	}
        	if(conexaoDicom.getAeTitle().length()<4 || conexaoDicom.getAeTitle().length()>255) {
        		return ResponseEntity.status(452).body(null);
        	}
        	if(conexaoDicom.getEnderecoIp().length()<2 || conexaoDicom.getEnderecoIp().length()>255) {
        		return ResponseEntity.status(453).body(null);
        	}
        	
            return ResponseEntity.status(HttpStatus.CREATED).body(save(conexaoDicom));
            
		} catch (Exception e) {
			
			return ResponseEntity.status(500).body(null);
		}
    	
    }
}
