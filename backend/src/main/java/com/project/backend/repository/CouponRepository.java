package com.project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.model.Coupon;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {


}
