-- Comment cua bang
SELECT utc.table_name, utc.comments
FROM User_Tab_Comments utc
WHERE utc.table_name NOT LIKE 'V_%'
ORDER BY utc.table_name;

SELECT utc.table_name, utc.column_name, ucc.comments, uts.comments
FROM User_Tab_Columns utc, User_Col_Comments ucc, User_Tab_Comments uts
WHERE utc.table_name NOT LIKE 'V_%'
AND utc.table_name = ucc.table_name
AND utc.column_name = ucc.column_name
AND utc.table_name = uts.table_name
ORDER BY utc.table_name, utc.column_name;

-- Tao sequence
SELECT 'CREATE SEQUENCE ' || ut.table_name || '_SEQ  MINVALUE 1 MAXVALUE 9999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;' FROM User_Tables ut;
CREATE SEQUENCE IN_STAFF_SEQ  MINVALUE 1 MAXVALUE 9999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

SELECT uc1.table_name
FROM user_constraints uc1, User_Constraints uc2
WHERE uc2.table_name = 'LABOUR_CONTRACT_TYPE'
AND uc1.constraint_type = 'R'
AND uc2.constraint_name = uc1.r_constraint_name;


SELECT uc1.table_name, ucc.column_name
FROM user_constraints uc1, User_Constraints uc2, User_Cons_Columns ucc
WHERE uc2.table_name = 'EMPLOYEE'
AND uc1.constraint_type = 'R'
AND uc2.constraint_name = uc1.r_constraint_name
AND uc1.constraint_name = ucc.constraint_name
ORDER BY uc1.table_name


SELECT
    utc.table_name,
    utc.column_name,
    utc.data_type,
    utc.data_length,
    NVL(utc.data_scale, 0) AS data_scale,
    utc.char_length
FROM User_Tab_Columns utc
ORDER BY utc.table_name, utc.column_name;

SELECT utc.table_name, utc.column_name, utc.data_type, utc.data_scale FROM User_Tab_Columns;

SELECT
    utc.column_name
FROM User_Tab_Columns utc
WHERE utc.table_name = 'REWARD_TIMEKEEPING'
ORDER BY utc.table_name, utc.column_name;

SELECT utc.column_name, utc.data_type, utc.data_scale, utc.data_precision
FROM User_Tab_Columns utc
WHERE utc.table_name = 'REWARD_PROCESS';

SELECT WM_CONCAT(utc.column_name)
FROM User_Tab_Columns utc
WHERE utc.table_name = 'REWARD_PROCESS';
