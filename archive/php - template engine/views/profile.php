<?php $this->layout('layout') ?>


<?php $this->section('content'); ?>
    <h1>User Profile</h1>
    <p>Hello, <?php echo $name; ?></p>
<?php $this->end(); ?>


<?php $this->section('sidebar'); ?>
    <h2>Sidebar</h2>
<?php $this->end(); ?>
