@php
    $i = 1;
@endphp

<table>
    <thead>
        <tr>
			<th>#</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </thead>

    <tbody>
        @foreach($users as $user)
            <tr>
				<td>{{ $i++ }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
