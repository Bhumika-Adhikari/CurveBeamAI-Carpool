﻿// <auto-generated />
using System;
using CarpoolPickup.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CarpoolPickup.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230220035700_AddedLeftAtAndCreatedAt")]
    partial class AddedLeftAtAndCreatedAt
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.14");

            modelBuilder.Entity("CarpoolPickup.Models.PickupCar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("HasLeft")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("LeftAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("RegistrationNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("PickupCars");
                });

            modelBuilder.Entity("CarpoolPickup.Models.SchoolClass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClassName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("CarpoolPickup.Models.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("SchoolClassId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("StudentName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("SchoolClassId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("PickupCarStudent", b =>
                {
                    b.Property<int>("PickupCarsId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StudentsId")
                        .HasColumnType("INTEGER");

                    b.HasKey("PickupCarsId", "StudentsId");

                    b.HasIndex("StudentsId");

                    b.ToTable("PickupCarStudent");
                });

            modelBuilder.Entity("CarpoolPickup.Models.Student", b =>
                {
                    b.HasOne("CarpoolPickup.Models.SchoolClass", null)
                        .WithMany("Students")
                        .HasForeignKey("SchoolClassId");
                });

            modelBuilder.Entity("PickupCarStudent", b =>
                {
                    b.HasOne("CarpoolPickup.Models.PickupCar", null)
                        .WithMany()
                        .HasForeignKey("PickupCarsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarpoolPickup.Models.Student", null)
                        .WithMany()
                        .HasForeignKey("StudentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CarpoolPickup.Models.SchoolClass", b =>
                {
                    b.Navigation("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
