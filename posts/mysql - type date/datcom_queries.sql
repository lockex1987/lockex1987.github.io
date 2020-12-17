
select * from calendar;

SELECT MONTH('2009-05-18');

select month(date), count(1) as number
from calendar
group by month(date);

select * from calendar c where '2018-12-01' <= c.date and c.date <= '2018-12-31';

select
	u.*,
	( select group_concat(concat(day(o.date), ':', o.number)) from orders o where o.user_id = u.id and '2018-12-01' <= o.date and o.date <= '2018-12-31' order by o.date ) as orders
from users u;

select
	u.*,
	( select group_concat(concat(day(o.date), ':', o.number)) from calendar c left join orders o on o.date = c.date where o.user_id = u.id and '2018-12-01' <= c.date and c.date <= '2018-12-31' order by o.date ) as orders
from users u;


select group_concat(concat(day(o.date), ':', o.number)) from calendar c left join  on o.date = c.date  ;

select day(c.date), t.number
from calendar c
left join ( select o.date, o.number from orders o where o.user_id = 6 ) t
	on t.date = c.date
where '2018-12-01' <= c.date
and c.date <= '2018-12-31'
order by c.date;
