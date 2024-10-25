import React, { useEffect } from "react";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice,data, setRange, setSlice,rowsPerPage }) => {


  const calculateRange = ( rowsPerPage) => {
      const range = [];
      const num = Math.ceil(data.length / rowsPerPage);
      let i = 1;
      for (let i = 1; i <= num; i++) {
          range.push(i);
      }
      return range;
  };


  const sliceData = (page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };


  function handlePage(el){
    setPage(el)

    if (!data || !Array.isArray(data)) {
        console.warn("Dados inválidos ou dividendos não são uma lista:", data);
        return;
    }
    

    if(data.length>0 ){
        const range = calculateRange(rowsPerPage);
        setRange([...range]);
        
        const sliceNew = sliceData(el, rowsPerPage);
        setSlice([...sliceNew]);
    }

  }

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  let realRange = [];

  if(page == 1&& data && data.length >= rowsPerPage){
    
    realRange.push(1);
    realRange.push(2);

    if(data.length/rowsPerPage>2){
      realRange.push(3);
    }
  }
  else if(data && data.length < rowsPerPage){
    realRange.push(range.length);
  }
  else if(page == range.length){
    
    if(range.length-2>0){
      realRange.push(range.length-2);
    }
    realRange.push(range.length-1);
    realRange.push(range.length);
   
    
  }
  else{
    realRange.push(page-1);
    realRange.push(page);
    realRange.push(page+1);
  }
  


  return (
    <div className={styles.tableFooter}>
      {realRange.map((el, index) => (
        
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => handlePage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;