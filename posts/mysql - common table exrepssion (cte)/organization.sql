select * from organization;

select id, name from organization where parent_id is null;

with recursive organization_path as
(
	(
		select
			id,
            name,
			-- parent_id
            -- 0 as lvl,
            -- json_array(id) as x,
            -- cast(id as varchar(255)) as y,
            -- name as path
            concat('/', id, '/') as path
		from organization
		-- where parent_id = 7
        where parent_id is null
	)
	union all
    (
		select
			c.id,
            c.name,
            -- c.parent_id
            -- cp.lvl + 1 as lvl,
            -- json_array_append(cp.x, '$', c.id) as x,
            -- concat(cp.y, ', ', c.id) as y,
            -- concat(cp.path, ' > ', c.name) as path
            concat(cp.path, c.id, '/') as path
		from organization_path cp, organization c
		where c.parent_id = cp.id
    )
)

/*
update organization
	join organization_path on organization.id = organization_path.id
set organization.path = organization_path.x
*/

select
   -- *
   -- concat('update organization set path = json_array(', cp.y, ') where id = ', cp.id, ';') as command
   concat('update organization set path = \'', cp.path, '\' where id = ', cp.id, ';') as command
from organization_path cp
order by cp.path
;


-- Kiểm tra quyền
with recursive organization_path as
(
	(
		select id, name, parent_id
		from organization
		where id = 10
	)
	union all
    (
		select c.id, c.name, c.parent_id
		from organization_path cp, organization c
		where c.id = cp.parent_id
    )
)
select count(1) as count
from permission p, role_permission rp, user_role ur, organization_path cp
where p.code = 'user.view-as'
and rp.permission_id = p.id
and ur.role_id = rp.role_id
and ur.user_id = 1
and cp.id = ur.role_id  -- ur.organization_id
;

select *
from organization c
where json_contains(c.path, 7);


select count(1) as count
from permission p, role_permission rp, user_role ur, organization c, organization cp
where p.code = 'user.view-as'
and rp.permission_id = p.id
and ur.role_id = rp.role_id
and ur.user_id = 1
and c.id = 10
and json_contains(c.path, cp.id)
and cp.id = ur.role_id -- ur.organization_id
;


select
	o.*,
    replace(o.path, '/1/17/', '/1/5/17/')
from organization o
where o.path like '/1/17/_%';

update organization
set path = replace(path, '/1/17/', '/1/5/17/')
where o.path like '/1/17/_%';

SELECT REPLACE('Hello CTTD','cttd','NAT');
